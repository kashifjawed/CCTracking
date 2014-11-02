/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./CancelBookingView", "../Dtos/CancelBookingDto", "../DAL/CancelBooking", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var CancelBookingCtrl = (function (_super) {
        __extends(CancelBookingCtrl, _super);
        function CancelBookingCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.CancelBookingDto();
            this.cancelBookingViewModel = new views.CancelBookingViewModel(this.backboneModel, this);
            this.cancelBookingView = new views.CancelBookingView({ viewModel: this.cancelBookingViewModel });
        }
        CancelBookingCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            if (url.indexOf("id=") > -1) {
                //alert(url.substring(url.indexOf("id=") + 3, url.length));
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.Load();
            }
        };

        CancelBookingCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            //var model = new dto.Models.StationDto();
            var model = this.backboneModel;
            this.cancelBookingViewModel.bbModel = model;
            this.cancelBookingViewModel.model = kb.viewModel(model);

            model.set("name", "");
            model.set("address", "");
            model.set("landmarkIdSelected", "");
            model.set("landmarkList", lookupResponse.landmark);
            model.set("contactNo1", "");
            model.set("contactNo2", "");
            model.set("isCoPartner", "");
            model.set("isActive", "");

            this.cancelBookingViewModel = new views.CancelBookingViewModel(model, this);
            this.cancelBookingView = new views.CancelBookingView({ viewModel: this.cancelBookingViewModel });
            this.cancelBookingView.on("SaveAlkhidmatCentre", function () {
                return _this.Save(_this.cancelBookingView.model);
            });
            this.cancelBookingView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.cancelBookingView);
            //this.GetAll();
        };

        //GetAll() {
        //    var deferred = DAL.GetAll();
        //    deferred.done(p=> this.GetAllCompleted(p));
        //}
        CancelBookingCtrl.prototype.GetByIdCompleted = function (cancelBookingDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(cancelBookingDto["cancelBookingModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.cancelBookingView = new views.CancelBookingView({ viewModel: this.cancelBookingViewModel });
            this.cancelBookingView.on("Event:SaveForm", function () {
                return _this.Save(_this.cancelBookingViewModel.bbModel);
            });
            this.cancelBookingView.on("Event:CancelForm", function () {
                return _this.Cancel();
            });

            //this.stationView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.cancelBookingView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        CancelBookingCtrl.prototype.Save = function (cancelBooking) {
            var _this = this;
            var appObj = this.app.request("AppGlobalSetting");
            cancelBooking.set("modifiedBy", appObj.get("Id"));
            cancelBooking.set("landmarkId", cancelBooking.get("landmarkIdSelected").id);
            cancelBooking.set("isActive", cancelBooking.get("isActive") == "1" ? true : false);
            cancelBooking.set("isCoPartner", cancelBooking.get("isCoPartner") == "1" ? true : false);
            var deferred = DAL.Save(cancelBooking);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        //GetAllCompleted(cancelBooking: dto.Models.CancelBookingDto) {
        //    //app = application.Application.getInstance();
        //    this.collection.reset(cancelBooking["centreList"]);
        //    this.collectionView = new views.StationCollectionView({ collection: this.collection });
        //    this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
        //    this.app.MainRegion.show(this.collectionView);
        //}
        CancelBookingCtrl.prototype.SaveCompleted = function (cancelBooking) {
            this.backboneModel = new Backbone.Model(cancelBooking);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (cancelBooking == undefined) {
                alert("Booking has been cancelled successfully!");
            } else {
                alert("Record has been saved successfully with ID : " + cancelBooking["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        CancelBookingCtrl.prototype.Cancel = function () {
            window.location.href = "#viewAlkhidmatCentre";
        };

        CancelBookingCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);

            //model.set("isActive", model.get("isActive") ? "1" : "0");
            //model.set("isCoPartner", model.get("isCoPartner") ? "1" : "0");
            this.cancelBookingViewModel.bbModel = model;
            this.cancelBookingViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.cancelBookingView.el)[0]);
            ko.applyBindings(this.cancelBookingViewModel, this.cancelBookingView.el);
        };
        return CancelBookingCtrl;
    })(helper.Controller);
    exports.CancelBookingCtrl = CancelBookingCtrl;
});
//# sourceMappingURL=CancelBookingCtrl.js.map
