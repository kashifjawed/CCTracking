var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./PaymentView", "../DAL/Payment", "marionette", "jquery", "knockout", "text!./PaymentTmpl.html"], function(require, exports, application, helper, views, DAL) {
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var app;

    var PaymentCtrl = (function (_super) {
        __extends(PaymentCtrl, _super);
        function PaymentCtrl() {
            var _this = this;
            app = application.Application.getInstance();
            _super.call(this);
            this.busVisitCollection = [];

            this.backboneCollection = new Backbone.Collection(this.busVisitCollection);
            this.busVisitCollectionView = new views.BusVisitCollectionView({ collection: this.backboneCollection });
            this.busVisitCollectionView.on("itemview:BusVisitRemoveItem", function (currentView, busId, centreId, driverId) {
                return _this.RemoveBusVisitItem(busId, centreId, driverId);
            });

            this.idCounter = 1;
        }
        PaymentCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            var id = "0";

            if (url.indexOf("id=") > -1) {
                id = (url.substring(url.indexOf("id=") + 3, url.length));
            }
            var deferredBusAvailability = DAL.GetBusAvialability(id);
            deferredBusAvailability.done(function (p) {
                _this.FillBusAvailability(p, id);
            });
        };

        PaymentCtrl.prototype.FillBusAvailability = function (busList, id) {
            var _this = this;
            var busAvailability = busList["busAvailabilityList"];
            if (id > 0) {
                var deferred = DAL.GetById(id);
                deferred.done(function (p) {
                    return _this.GetByIdCompleted(p, busAvailability);
                });
            } else {
                this.LoadCompleted(busAvailability);
            }
        };

        PaymentCtrl.prototype.GetByIdCompleted = function (paymentResponse, busList) {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            var model = new Backbone.Model(paymentResponse["paymentModel"]);

            var url = window.location.href;
            var id = (url.substring(url.indexOf("id=") + 3, url.length));
            if (model.get("id") === undefined || model.get("id") === 0) {
                this.InitalizeKoBinding(model);
            }

            model.set("bookingId", id);
            this.layout = app.AppLayout;
            this.paymentView = new views.PaymentView(busList, model);
            var vm = this.paymentView.viewModel;

            this.paymentView.on("BusVisitAddItem", function (bookingId, alkhidmatCentre, driver, bus) {
                return _this.AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus);
            });
            this.paymentView.on("PaymentSave", function (bbmodel) {
                return _this.Save(bbmodel);
            });

            this.backboneCollection = new Backbone.Collection(model.get("busVisits"));
            this.busVisitCollectionView = new views.BusVisitCollectionView({ collection: this.backboneCollection });
            this.busVisitCollectionView.on("itemview:BusVisitRemoveItem", function (currentView, busId, centreId, driverId) {
                return _this.RemoveBusVisitItem(busId, centreId, driverId);
            });

            app.MainRegion.show(this.paymentView);
            app.SubRegion.reset();
            app.SubRegion.show(this.busVisitCollectionView);
        };

        PaymentCtrl.prototype.InitalizeKoBinding = function (model) {
            model.set("amount", "");
            model.set("busChangeReason", "");
            model.set("receiptNo", "");
            model.set("easyPaisaTranNo", "");
            model.set("extraAmountCharge", "");
            model.set("extraAmountReason", "");
            model.set("extraAmountReceipt", "");
        };

        PaymentCtrl.prototype.LoadCompleted = function (busList) {
            var _this = this;
            this.layout = app.AppLayout;
            this.paymentView = new views.PaymentView(busList);

            this.paymentView.on("BusVisitAddItem", function (bookingId, alkhidmatCentre, driver, bus) {
                return _this.AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus);
            });
            this.paymentView.on("PaymentSave", function (bbmodel) {
                return _this.Save(bbmodel);
            });
            app.MainRegion.show(this.paymentView);
            app.SubRegion.reset();
            app.SubRegion.show(this.busVisitCollectionView);
        };

        PaymentCtrl.prototype.AddBusVisitItem = function (bookingId, alkhidmatCentre, driver, bus) {
            var counter = this.idCounter++;
            var busExist = this.backboneCollection.findWhere({ busId: bus.id });
            var driverExist = this.backboneCollection.findWhere({ driverId: driver.id });

            if (busExist == undefined && driverExist == undefined) {
                this.backboneCollection.push(new Backbone.Model({
                    busVisitId: counter,
                    centreId: alkhidmatCentre.id, centreDesc: alkhidmatCentre.description,
                    busId: bus.id, busDesc: bus.description,
                    driverId: driver.id, driverDesc: driver.description,
                    visitTypeId: "2",
                    isAvailableForBooking: false,
                    isAvailableForFutureBooking: false,
                    bookingId: bookingId
                }));
                this.busVisitCollectionView.collection = this.backboneCollection;
            } else {
                alert("Already exists!");
            }
        };
        PaymentCtrl.prototype.RemoveBusVisitItem = function (busId, centreId, driverId) {
            this.backboneCollection.remove(this.backboneCollection.findWhere({ busId: busId, centreId: centreId, driverId: driverId }));
        };

        PaymentCtrl.prototype.Save = function (payment) {
            if (this.backboneCollection.length < 1) {
                alert("Please add bus details");
                return;
            }

            payment.set("busVisits", this.backboneCollection.toJSON());
            var deferred = DAL.Save(payment);

            deferred.done(function (p) {
                return new views.PaymentView(null).SaveCompleted(p);
            });
        };
        return PaymentCtrl;
    })(helper.Controller);
    exports.PaymentCtrl = PaymentCtrl;
});
