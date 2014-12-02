/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./TrackingDeviceView", "../../Dtos/TrackingDeviceDto", "../../DAL/TrackingDevice", "marionette", "jquery", "knockout", "text!./TrackingDeviceTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./TrackingDeviceTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var TrackingDeviceCtrl = (function (_super) {
        __extends(TrackingDeviceCtrl, _super);
        function TrackingDeviceCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.TrackingDeviceDto();
            this.trackingDeviceViewModel = new views.TrackingDeviceViewModel(this.backboneModel, this);
            this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });

            //this.trackingDeviceView.on("SaveTrackingDevice", () => this.Save(this.trackingDeviceView.model));
            this.collection = new dto.Models.TrackingDeviceCollection({});
            this.collectionView = new views.TrackingDeviceCollectionView({ collection: this.collection });
            //this.events.listento
        }
        TrackingDeviceCtrl.prototype.Show = function () {
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

        TrackingDeviceCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.trackingDeviceViewModel.bbModel = model;
            this.trackingDeviceViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("trackingNo", "");
            model.set("isActive", "");

            this.trackingDeviceViewModel = new views.TrackingDeviceViewModel(model, this);
            this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });
            this.trackingDeviceView.on("SaveTrackingDevice", function () {
                return _this.Save(_this.trackingDeviceViewModel.bbModel);
            });

            this.trackingDeviceView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.trackingDeviceView);
            //this.GetAll();
        };

        TrackingDeviceCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        TrackingDeviceCtrl.prototype.GetByIdCompleted = function (trackingDeviceDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(trackingDeviceDto["trackingDeviceModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.trackingDeviceView = new views.TrackingDeviceView({ viewModel: this.trackingDeviceViewModel });
            this.trackingDeviceView.on("SaveTrackingDevice", function () {
                return _this.Save(_this.trackingDeviceViewModel.bbModel);
            });
            this.trackingDeviceView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.trackingDeviceView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.trackingDeviceView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        TrackingDeviceCtrl.prototype.Save = function (trackingDevice) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            trackingDevice.set("modifiedBy", appObj.get("Id"));
            trackingDevice.set("isActive", trackingDevice.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(trackingDevice);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        TrackingDeviceCtrl.prototype.GetAllCompleted = function (trackingDevice) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(trackingDevice["trackingDeviceList"]);
            this.collectionView = new views.TrackingDeviceCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        TrackingDeviceCtrl.prototype.SaveCompleted = function (trackingDeviceDto) {
            var result = new Backbone.Model(trackingDeviceDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Tracking Device", "Due to some technical reason Tracking Device have not been saved successfully!<br> Pelase try later");
            } else {
                //alert("Record has been saved successfully with TrackingDevice ID : " + trackingDeviceDto["id"]);
                helper.ShowModalPopup("success", "Tracking Device", "Record has been saved successfully with TrackingDevice ID : " + trackingDeviceDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        TrackingDeviceCtrl.prototype.Cancel = function () {
            window.location.href = "#viewTrackingDevice";
        };

        TrackingDeviceCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.trackingDeviceViewModel.bbModel = model;
            this.trackingDeviceViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.trackingDeviceView.el)[0]);
            ko.applyBindings(this.trackingDeviceViewModel, this.trackingDeviceView.el);
        };
        return TrackingDeviceCtrl;
    })(helper.Controller);
    exports.TrackingDeviceCtrl = TrackingDeviceCtrl;
});
