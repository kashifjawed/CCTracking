var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "../App", "marionette", "jquery", "knockout", "text!./PaymentTmpl.html", "text!./PaymentGrid.html"], function(require, exports, helper, application) {
    var _ = require('underscore');
    var ko = require("knockout");

    var templateView = require("text!./PaymentTmpl.html");
    var templateGrid = require("text!./PaymentGrid.html");

    var app;

    var PaymentViewModel = (function (_super) {
        __extends(PaymentViewModel, _super);
        function PaymentViewModel(model, controller) {
            var _this = this;
            _super.call(this, model, controller);
            this.model.paymentTypeSelected.subscribe(function () {
                if (_this.model.paymentTypeSelected().id == 1) {
                    _this.model.isCash = true;
                } else {
                    _this.model.isCash = false;
                }
            });
        }
        return PaymentViewModel;
    })(helper.ViewModel);
    exports.PaymentViewModel = PaymentViewModel;

    var PaymentView = (function (_super) {
        __extends(PaymentView, _super);
        function PaymentView(busList, options) {
            app = application.Application.getInstance();
            this.template = templateView;

            this.viewModel = new ViewModel(busList, options);

            this.bbModel = new Backbone.Model();
            this.events = {
                "submit": "Save",
                "click .jsAddMore": "AddMore"
            };
            _super.call(this, options);
        }
        PaymentView.prototype.AddMore = function () {
            this.trigger("BusVisitAddItem", this.viewModel.bookingId(), this.viewModel.alkhidmatCentreSelected(), this.viewModel.driverSelected(), this.viewModel.busSelected());
        };

        PaymentView.prototype.Save = function (e) {
            e.preventDefault();

            this.bbModel.set("id", this.viewModel.Id());
            this.bbModel.set("bookingId", this.viewModel.bookingId());
            this.bbModel.set("paymentType", this.viewModel.paymentType());
            this.bbModel.set("pricing", this.viewModel.pricing());
            this.bbModel.set("amount", this.viewModel.amount());
            this.bbModel.set("paymentLocation", this.viewModel.paymentLocation());
            this.bbModel.set("officerId", this.viewModel.officerId());
            this.bbModel.set("receiptNo", this.viewModel.receiptNo());
            this.bbModel.set("extraAmountCharge", this.viewModel.extraAmountCharge());
            this.bbModel.set("extraAmountReason", this.viewModel.extraAmountReason());
            this.bbModel.set("extraAmountReceipt", this.viewModel.extraAmountReceipt());
            this.bbModel.set("easyPaisaTranNo", this.viewModel.easyPaisaTranNo());

            this.bbModel.set("bus", this.viewModel.busSelected().id);
            this.bbModel.set("driver", this.viewModel.driverSelected().id);
            this.bbModel.set("alkhidmatCentre", this.viewModel.alkhidmatCentreSelected().id);
            this.bbModel.set("paymentLocation", this.viewModel.paymentLocationSelected().id);
            this.bbModel.set("officerId", this.viewModel.cashierSelected().id);
            this.bbModel.set("paymentType", this.viewModel.paymentTypeSelected().id);

            this.trigger("PaymentSave", this.bbModel);
        };

        PaymentView.prototype.SaveCompleted = function (paymentResponse) {
            var result = new Backbone.Model(paymentResponse);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Payment", "Due to some technical reason payment have not been saved successfully!<br> Pelase try later");
            } else {
                helper.ShowModalPopup("success", "Payment", "Record has been saved successfully with Payment ID : " + paymentResponse["id"]);

                location.href = "#viewBooking";
            }
            app.vent.trigger("Event:UpdateSummary");
        };
        PaymentView.prototype.onShow = function () {
            ko.applyBindings(this.viewModel, this.el);
        };

        PaymentView.prototype.onClose = function () {
            app.vent.off("Event:UpdateSummary");
        };
        return PaymentView;
    })(helper.Views.ItemView);
    exports.PaymentView = PaymentView;

    var ViewModel = (function () {
        function ViewModel(busLsit, model) {
            var _this = this;
            if (model == undefined) {
                this.Id = ko.observable();
                this.bookingId = ko.observable();
                this.paymentType = ko.observable();
                this.pricing = ko.observable();
                this.amount = ko.observable();
                this.paymentLocation = ko.observable();
                this.officerId = ko.observable();
                this.receiptNo = ko.observable();
                this.extraAmountCharge = ko.observable();
                this.extraAmountReason = ko.observable();
                this.extraAmountReceipt = ko.observable();
                this.paymentStatus = ko.observable();

                this.easyPaisaTranNo = ko.observable();

                var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

                this.busList = ko.observableArray(busLsit);
                this.busSelected = ko.observable();
                this.driverList = ko.observableArray(lookupResponse.driver);
                this.driverSelected = ko.observable();
                this.alkhidmatCentreList = ko.observableArray(lookupResponse.alkhidmatCentre);
                this.alkhidmatCentreSelected = ko.observable();
                this.paymentLocationList = ko.observableArray(lookupResponse.alkhidmatCentre);
                this.paymentLocationSelected = ko.observable();
                this.cashierList = ko.observableArray(lookupResponse.cashier);
                this.cashierSelected = ko.observable();
                this.paymentTypeList = ko.observableArray(lookupResponse.paymentType);
                this.paymentTypeSelected = ko.observable();
                this.currentDisplay = ko.observable();
                this.isEasyPaisa = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentTypeSelected() != undefined && _this.paymentTypeSelected().id === 2 && _this.easyPaisaTranNo().trim() == "") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isPaid = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "1") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isCancel = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "2") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.paymentStatusDesc = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "1") {
                            _this.currentDisplay("panel panel-default");
                            return "Paid";
                        } else if (_this.paymentStatus() == "2") {
                            _this.currentDisplay("panel panel-danger");
                            return "Cancel";
                        } else {
                            _this.currentDisplay("panel panel-warning");
                            return "Unpaid";
                        }
                    }
                });
            } else {
                this.Id = ko.observable(model.get("id"));
                this.bookingId = ko.observable(model.get("bookingId"));
                this.paymentType = ko.observable();
                this.pricing = ko.observable();
                this.amount = ko.observable(model.get("amount"));
                this.paymentLocation = ko.observable();
                this.officerId = ko.observable();
                this.receiptNo = ko.observable(model.get("receiptNo"));
                this.extraAmountCharge = ko.observable(model.get("extraAmountCharge"));
                this.extraAmountReason = ko.observable(model.get("extraAmountReason"));
                this.extraAmountReceipt = ko.observable(model.get("extraAmountReceipt"));
                this.paymentStatus = ko.observable(model.get("paymentStatus"));
                this.easyPaisaTranNo = ko.observable(model.get("easyPaisaTranNo"));

                var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

                this.busList = ko.observableArray(busLsit);
                this.busSelected = ko.observable();
                this.driverList = ko.observableArray(lookupResponse.driver);
                this.driverSelected = ko.observable();
                this.alkhidmatCentreList = ko.observableArray(lookupResponse.alkhidmatCentre);
                this.alkhidmatCentreSelected = ko.observable();
                this.paymentLocationList = ko.observableArray(lookupResponse.alkhidmatCentre);

                var paymentLocation = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                    return p.id == model.get("paymentLocation");
                });

                var paymentType = _.filter(lookupResponse.paymentType, function (p) {
                    return p.id == model.get("paymentType");
                });

                var cashier = _.filter(lookupResponse.cashier, function (p) {
                    return p.id == model.get("officerId");
                });

                this.paymentLocationSelected = ko.observable(paymentLocation[0]);
                this.cashierList = ko.observableArray(lookupResponse.cashier);
                this.cashierSelected = ko.observable(cashier[0]);
                this.paymentTypeList = ko.observableArray(lookupResponse.paymentType);
                this.paymentTypeSelected = ko.observable(paymentType[0]);
                this.currentDisplay = ko.observable();
                this.isEasyPaisa = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentTypeSelected() != undefined && _this.paymentTypeSelected().id === 2 && _this.easyPaisaTranNo().trim() == "") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isPaid = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "1") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isCancel = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "2") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.paymentStatusDesc = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.paymentStatus() == "1") {
                            _this.currentDisplay("panel panel-default");
                            return "Paid";
                        } else if (_this.paymentStatus() == "2") {
                            _this.currentDisplay("panel panel-danger");
                            return "Cancel";
                        } else {
                            _this.currentDisplay("panel panel-warning");
                            return "Unpaid";
                        }
                    }
                });
            }
        }
        ViewModel.prototype.setOptionDisable = function (option, item) {
            if (item.description.indexOf('Booked - Paid') >= 0 || item.description.indexOf('Booked - Unpaid') >= 0) {
                ko.applyBindingsToNode(option, { disable: true, text: item.description }, item);
            }
        };
        return ViewModel;
    })();
    exports.ViewModel = ViewModel;

    var BusVisitCollectionView = (function (_super) {
        __extends(BusVisitCollectionView, _super);
        function BusVisitCollectionView(options) {
            app = application.Application.getInstance();
            options.itemView = BusVisitItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return BusVisitCollectionView;
    })(helper.Views.CompositeView);
    exports.BusVisitCollectionView = BusVisitCollectionView;

    var BusVisitItemView = (function (_super) {
        __extends(BusVisitItemView, _super);
        function BusVisitItemView(options) {
            var _this = this;
            if (!options)
                options = {};
            options.template = templateGrid.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                "mouseover .jsShowDetail": "ShowDetail",
                "click .jsShowDetail": "ShowDetail",
                "click .jsRemoveItem": function () {
                    return _this.RemoveItem();
                }
            };
            _super.call(this, options);
        }
        BusVisitItemView.prototype.RemoveItem = function () {
            this.trigger("BusVisitRemoveItem", this.model.get("busId"), this.model.get("centreId"), this.model.get("driverId"));
        };
        BusVisitItemView.prototype.ShowDetail = function () {
        };
        return BusVisitItemView;
    })(helper.Views.ItemView);
    exports.BusVisitItemView = BusVisitItemView;
});
