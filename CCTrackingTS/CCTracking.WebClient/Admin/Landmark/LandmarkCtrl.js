/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./LandmarkView", "../../Dtos/LandmarkDto", "../../DAL/Landmark", "marionette", "jquery", "knockout", "text!./LandmarkTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./LandmarkTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var LandmarkCtrl = (function (_super) {
        __extends(LandmarkCtrl, _super);
        function LandmarkCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.LandmarkDto();
            this.landmarkViewModel = new views.LandmarkViewModel(this.backboneModel, this);
            this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });

            //this.landmarkView.on("SaveLandmark", () => this.Save(this.landmarkView.model));
            this.collection = new dto.Models.LandmarkCollection({});
            this.collectionView = new views.LandmarkCollectionView({ collection: this.collection });
            //this.events.listento
        }
        LandmarkCtrl.prototype.Show = function () {
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

        LandmarkCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            //var model = new dto.Models.LandmarkDto();
            var model = this.backboneModel;
            this.landmarkViewModel.bbModel = model;
            this.landmarkViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("unionCouncilList", lookupResponse.unionCouncil);
            model.set("unionCouncilIdSelected", "");
            model.set("isActive", "");

            this.landmarkViewModel = new views.LandmarkViewModel(model, this);
            this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });
            this.landmarkView.on("SaveLandmark", function () {
                return _this.Save(_this.landmarkViewModel.bbModel);
            });

            this.landmarkView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.landmarkView);
            //this.GetAll();
        };

        LandmarkCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        LandmarkCtrl.prototype.GetByIdCompleted = function (landmarkDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(landmarkDto["landmarkModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.landmarkView = new views.LandmarkView({ viewModel: this.landmarkViewModel });
            this.landmarkView.on("SaveLandmark", function () {
                return _this.Save(_this.landmarkViewModel.bbModel);
            });
            this.landmarkView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.landmarkView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.landmarkView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        LandmarkCtrl.prototype.Save = function (landmark) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            landmark.set("modifiedBy", appObj.get("Id"));
            landmark.set("ucId", landmark.get("unionCouncilIdSelected").id);
            landmark.set("isActive", landmark.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(landmark);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        LandmarkCtrl.prototype.GetAllCompleted = function (landmark) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(landmark["landmarkList"]);
            this.collectionView = new views.LandmarkCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        LandmarkCtrl.prototype.SaveCompleted = function (landmarkDto) {
            var result = new Backbone.Model(landmarkDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Landmark", "Due to some technical reason Landmark have not been saved successfully!<br> Pelase try later");
            } else {
                helper.ShowModalPopup("success", "Landmark", "Record has been saved successfully with Landmark ID : " + landmarkDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        LandmarkCtrl.prototype.Cancel = function () {
            window.location.href = "#viewLandmark";
        };

        LandmarkCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("unionCouncilList", lookupResponse.unionCouncil);
            var unionCouncil = _.filter(lookupResponse.unionCouncil, function (p) {
                return p.id == model.get("ucId");
            });
            model.set("unionCouncilIdSelected", unionCouncil[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.landmarkViewModel.bbModel = model;
            this.landmarkViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.landmarkView.el)[0]);
            ko.applyBindings(this.landmarkViewModel, this.landmarkView.el);
        };
        return LandmarkCtrl;
    })(helper.Controller);
    exports.LandmarkCtrl = LandmarkCtrl;
});
