/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./CauseOfDeathView", "../../Dtos/CauseOfDeathDto", "../../DAL/CauseOfDeath", "marionette", "jquery", "knockout", "text!./CauseOfDeathTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./CauseOfDeathTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var CauseOfDeathCtrl = (function (_super) {
        __extends(CauseOfDeathCtrl, _super);
        function CauseOfDeathCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.CauseOfDeathDto();
            this.causeOfDeathViewModel = new views.CauseOfDeathViewModel(this.backboneModel, this);
            this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });

            //this.causeOfDeathView.on("SaveCauseOfDeath", () => this.Save(this.causeOfDeathView.model));
            this.collection = new dto.Models.CauseOfDeathCollection({});
            this.collectionView = new views.CauseOfDeathCollectionView({ collection: this.collection });
            //this.events.listento
        }
        CauseOfDeathCtrl.prototype.Show = function () {
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

        CauseOfDeathCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.causeOfDeathViewModel.bbModel = model;
            this.causeOfDeathViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("isActive", "");

            this.causeOfDeathViewModel = new views.CauseOfDeathViewModel(model, this);
            this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });
            this.causeOfDeathView.on("SaveCauseOfDeath", function () {
                return _this.Save(_this.causeOfDeathViewModel.bbModel);
            });

            this.causeOfDeathView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.causeOfDeathView);
            //this.GetAll();
        };

        CauseOfDeathCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        CauseOfDeathCtrl.prototype.GetByIdCompleted = function (causeOfDeathDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(causeOfDeathDto["causeofDeathModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.causeOfDeathView = new views.CauseOfDeathView({ viewModel: this.causeOfDeathViewModel });
            this.causeOfDeathView.on("SaveCauseOfDeath", function () {
                return _this.Save(_this.causeOfDeathViewModel.bbModel);
            });
            this.causeOfDeathView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.causeOfDeathView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.causeOfDeathView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        CauseOfDeathCtrl.prototype.Save = function (causeOfDeath) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            causeOfDeath.set("modifiedBy", appObj.get("Id"));
            causeOfDeath.set("isActive", causeOfDeath.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(causeOfDeath);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        CauseOfDeathCtrl.prototype.GetAllCompleted = function (causeOfDeath) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(causeOfDeath["causeofDeathList"]);
            this.collectionView = new views.CauseOfDeathCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        CauseOfDeathCtrl.prototype.SaveCompleted = function (causeOfDeathDto) {
            this.backboneModel = new Backbone.Model(causeOfDeathDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (causeOfDeathDto == undefined) {
                //alert("CauseOfDeath Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "Cause Of Death", "CauseOfDeath Detail have not been saved successfully!");
            } else {
                //alert("Record has been saved successfully with CauseOfDeath ID : " + causeOfDeathDto["id"]);
                helper.ShowModalPopup("success", "Cause Of Death", "Record has been saved successfully with CauseOfDeath ID : " + causeOfDeathDto["id"]);
                this.Cancel();
            }
        };

        CauseOfDeathCtrl.prototype.Cancel = function () {
            window.location.href = "#viewCauseOfDeath";
        };

        CauseOfDeathCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.causeOfDeathViewModel.bbModel = model;
            this.causeOfDeathViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.causeOfDeathView.el)[0]);
            ko.applyBindings(this.causeOfDeathViewModel, this.causeOfDeathView.el);
        };
        return CauseOfDeathCtrl;
    })(helper.Controller);
    exports.CauseOfDeathCtrl = CauseOfDeathCtrl;
});
