/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./GraveyardView", "../../Dtos/GraveyardDto", "../../DAL/Graveyard", "marionette", "jquery", "knockout", "text!./GraveyardTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./GraveyardTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var GraveyardCtrl = (function (_super) {
        __extends(GraveyardCtrl, _super);
        function GraveyardCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.GraveyardDto();
            this.graveyardViewModel = new views.GraveyardViewModel(this.backboneModel, this);
            this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });

            //this.graveyardView.on("SaveGraveyard", () => this.Save(this.graveyardView.model));
            this.collection = new dto.Models.GraveyardCollection({});
            this.collectionView = new views.GraveyardCollectionView({ collection: this.collection });
            //this.events.listento
        }
        GraveyardCtrl.prototype.Show = function () {
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

        GraveyardCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            //var model = new dto.Models.GraveyardDto();
            var model = this.backboneModel;
            this.graveyardViewModel.bbModel = model;
            this.graveyardViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("landmarkIdSelected", "");
            model.set("landmarkList", lookupResponse.landmark);
            model.set("isActive", "1");

            this.graveyardViewModel = new views.GraveyardViewModel(model, this);
            this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });
            this.graveyardView.on("SaveGraveyard", function () {
                return _this.Save(_this.graveyardViewModel.bbModel);
            });

            this.graveyardView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.graveyardView);
            //this.GetAll();
        };

        GraveyardCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        GraveyardCtrl.prototype.GetByIdCompleted = function (graveyardDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(graveyardDto["graveyardModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.graveyardView = new views.GraveyardView({ viewModel: this.graveyardViewModel });
            this.graveyardView.on("SaveGraveyard", function () {
                return _this.Save(_this.graveyardViewModel.bbModel);
            });
            this.graveyardView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.graveyardView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.graveyardView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        GraveyardCtrl.prototype.Save = function (graveyard) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            graveyard.set("modifiedBy", appObj.get("Id"));
            graveyard.set("landmarkId", graveyard.get("landmarkIdSelected").id);
            graveyard.set("isActive", graveyard.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(graveyard);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        GraveyardCtrl.prototype.GetAllCompleted = function (graveyard) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(graveyard["graveyardList"]);
            this.collectionView = new views.GraveyardCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        GraveyardCtrl.prototype.SaveCompleted = function (graveyardDto) {
            this.backboneModel = new Backbone.Model(graveyardDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (graveyardDto == undefined) {
                helper.ShowModalPopup("danger", "Graveyard", "Booking have not been saved successfully!");
                //alert("Graveyard Detail have not been saved successfully!");
            } else {
                // alert("Record has been saved successfully with Graveyard ID : " + graveyardDto["id"]);
                helper.ShowModalPopup("success", "Graveyard", "Record has been saved successfully with Graveyard ID : " + graveyardDto["id"]);

                //this.UIBinding(model);
                this.Cancel();
            }
        };

        GraveyardCtrl.prototype.Cancel = function () {
            window.location.href = "#viewGraveyard";
        };

        GraveyardCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.graveyardViewModel.bbModel = model;
            this.graveyardViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.graveyardView.el)[0]);
            ko.applyBindings(this.graveyardViewModel, this.graveyardView.el);
        };
        return GraveyardCtrl;
    })(helper.Controller);
    exports.GraveyardCtrl = GraveyardCtrl;
});
