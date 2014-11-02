/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./TownView", "../../Dtos/TownDto", "../../DAL/Town", "marionette", "jquery", "knockout", "text!./TownTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./TownTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var TownCtrl = (function (_super) {
        __extends(TownCtrl, _super);
        function TownCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.TownDto();
            this.townViewModel = new views.TownViewModel(this.backboneModel, this);
            this.townView = new views.TownView({ viewModel: this.townViewModel });

            //this.townView.on("SaveTown", () => this.Save(this.townView.model));
            this.collection = new dto.Models.TownCollection({});
            this.collectionView = new views.TownCollectionView({ collection: this.collection });
            //this.events.listento
        }
        TownCtrl.prototype.Show = function () {
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

        TownCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.townViewModel.bbModel = model;
            this.townViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("isActive", "");

            this.townViewModel = new views.TownViewModel(model, this);
            this.townView = new views.TownView({ viewModel: this.townViewModel });
            this.townView.on("SaveTown", function () {
                return _this.Save(_this.townViewModel.bbModel);
            });

            this.townView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.townView);
            //this.GetAll();
        };

        TownCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        TownCtrl.prototype.GetByIdCompleted = function (townDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(townDto["townModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.townView = new views.TownView({ viewModel: this.townViewModel });
            this.townView.on("SaveTown", function () {
                return _this.Save(_this.townViewModel.bbModel);
            });
            this.townView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.townView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.townView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        TownCtrl.prototype.Save = function (town) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            town.set("modifiedBy", appObj.get("Id"));
            town.set("isActive", town.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(town);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        TownCtrl.prototype.GetAllCompleted = function (town) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(town["townList"]);
            this.collectionView = new views.TownCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        TownCtrl.prototype.SaveCompleted = function (townDto) {
            this.backboneModel = new Backbone.Model(townDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (townDto == undefined) {
                //alert("Town Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "Town", "Town Detail have not been saved successfully!");
            } else {
                //alert("Record has been saved successfully with Town ID : " + townDto["id"]);
                helper.ShowModalPopup("success", "Town", "Record has been saved successfully with Town ID : " + townDto["id"]);
                this.Cancel();
            }
        };

        TownCtrl.prototype.Cancel = function () {
            window.location.href = "#viewTown";
        };

        TownCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.townViewModel.bbModel = model;
            this.townViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.townView.el)[0]);
            ko.applyBindings(this.townViewModel, this.townView.el);
        };
        return TownCtrl;
    })(helper.Controller);
    exports.TownCtrl = TownCtrl;
});
