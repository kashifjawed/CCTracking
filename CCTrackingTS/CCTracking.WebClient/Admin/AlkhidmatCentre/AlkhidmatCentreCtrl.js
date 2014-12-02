/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./AlkhidmatCentreView", "../../Dtos/AlkhidmatCentreDto", "../../DAL/AlkhidmatCentre", "marionette", "jquery", "knockout", "text!./AlkhidmatCentreTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./AlkhidmatCentreTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var StationCtrl = (function (_super) {
        __extends(StationCtrl, _super);
        function StationCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.StationDto();
            this.stationViewModel = new views.StationViewModel(this.backboneModel, this);
            this.stationView = new views.StationView({ viewModel: this.stationViewModel });

            //this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationView.model));
            this.collection = new dto.Models.StationCollection({});
            this.collectionView = new views.StationCollectionView({ collection: this.collection });
            //this.events.listento
        }
        StationCtrl.prototype.Show = function () {
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

        StationCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            //var model = new dto.Models.StationDto();
            var model = this.backboneModel;
            this.stationViewModel.bbModel = model;
            this.stationViewModel.model = kb.viewModel(model);

            model.set("name", "");
            model.set("address", "");
            model.set("landmarkIdSelected", "");
            model.set("landmarkList", lookupResponse.landmark);
            model.set("contactNo1", "");
            model.set("contactNo2", "");
            model.set("isCoPartner", "");
            model.set("isActive", "");

            this.stationViewModel = new views.StationViewModel(model, this);
            this.stationView = new views.StationView({ viewModel: this.stationViewModel });
            this.stationView.on("SaveAlkhidmatCentre", function () {
                return _this.Save(_this.stationViewModel.bbModel);
            });

            this.stationView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.stationView);
            //this.GetAll();
        };

        StationCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        StationCtrl.prototype.GetByIdCompleted = function (stationDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(stationDto["centreModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.stationView = new views.StationView({ viewModel: this.stationViewModel });
            this.stationView.on("SaveAlkhidmatCentre", function () {
                return _this.Save(_this.stationViewModel.bbModel);
            });
            this.stationView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.stationView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.stationView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        StationCtrl.prototype.Save = function (station) {
            var _this = this;
            var appObj = this.app.request("AppGlobalSetting");
            station.set("modifiedBy", appObj.get("Id"));
            station.set("landmarkId", station.get("landmarkIdSelected").id);
            station.set("isActive", station.get("isActive") == "1" ? true : false);
            station.set("isCoPartner", station.get("isCoPartner") == "1" ? true : false);
            var deferred = DAL.Save(station);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        StationCtrl.prototype.GetAllCompleted = function (station) {
            var _this = this;
            //app = application.Application.getInstance();
            this.collection.reset(station["centreList"]);
            this.collectionView = new views.StationCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        StationCtrl.prototype.SaveCompleted = function (stationDto) {
            var result = new Backbone.Model(stationDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Alkhidmat Centre", "Due to some technical reason Alkhidmat Centre have not been saved successfully!<br> Pelase try later");
            } else {
                helper.ShowModalPopup("success", "Alkhidmat Centre", "Record has been saved successfully with Alkhidmat Centre ID : " + stationDto["id"]);
                this.Cancel();
            }
        };

        StationCtrl.prototype.Cancel = function () {
            window.location.href = "#viewAlkhidmatCentre";
        };

        StationCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);
            model.set("isActive", model.get("isActive") ? "1" : "0");
            model.set("isCoPartner", model.get("isCoPartner") ? "1" : "0");

            this.stationViewModel.bbModel = model;
            this.stationViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.stationView.el)[0]);
            ko.applyBindings(this.stationViewModel, this.stationView.el);
            //this.stationView = new views.StationView({ viewModel: this.stationViewModel });
            //this.stationView.on("SaveAlkhidmatCentre", () => this.Save(this.stationViewModel.bbModel));
        };
        return StationCtrl;
    })(helper.Controller);
    exports.StationCtrl = StationCtrl;
});
