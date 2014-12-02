/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./VisitTypeView", "../../Dtos/VisitTypeDto", "../../DAL/VisitType", "marionette", "jquery", "knockout", "text!./VisitTypeTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./VisitTypeTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var VisitTypeCtrl = (function (_super) {
        __extends(VisitTypeCtrl, _super);
        function VisitTypeCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.VisitTypeDto();
            this.visitTypeViewModel = new views.VisitTypeViewModel(this.backboneModel, this);
            this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });

            //this.visitTypeView.on("SaveVisitType", () => this.Save(this.visitTypeView.model));
            this.collection = new dto.Models.VisitTypeCollection({});
            this.collectionView = new views.VisitTypeCollectionView({ collection: this.collection });
            //this.events.listento
        }
        VisitTypeCtrl.prototype.Show = function () {
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

        VisitTypeCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.visitTypeViewModel.bbModel = model;
            this.visitTypeViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("isActive", "");

            this.visitTypeViewModel = new views.VisitTypeViewModel(model, this);
            this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });
            this.visitTypeView.on("SaveVisitType", function () {
                return _this.Save(_this.visitTypeViewModel.bbModel);
            });

            this.visitTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.visitTypeView);
            //this.GetAll();
        };

        VisitTypeCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        VisitTypeCtrl.prototype.GetByIdCompleted = function (visitTypeDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(visitTypeDto["visitTypeModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.visitTypeView = new views.VisitTypeView({ viewModel: this.visitTypeViewModel });
            this.visitTypeView.on("SaveVisitType", function () {
                return _this.Save(_this.visitTypeViewModel.bbModel);
            });
            this.visitTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.visitTypeView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.visitTypeView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        VisitTypeCtrl.prototype.Save = function (visitType) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            visitType.set("modifiedBy", appObj.get("Id"));
            visitType.set("isActive", visitType.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(visitType);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        VisitTypeCtrl.prototype.GetAllCompleted = function (visitType) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(visitType["visitTypeList"]);
            this.collectionView = new views.VisitTypeCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        VisitTypeCtrl.prototype.SaveCompleted = function (visitTypeDto) {
            var result = new Backbone.Model(visitTypeDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Visit Type", "Due to some technical reason Visit Type have not been saved successfully!<br> Pelase try later");
            } else {
                //alert("Record has been saved successfully with VisitType ID : " + visitTypeDto["id"]);
                helper.ShowModalPopup("success", "Visit Type", "Record has been saved successfully with VisitType ID : " + visitTypeDto["id"]);
                this.Cancel();
            }
        };

        VisitTypeCtrl.prototype.Cancel = function () {
            window.location.href = "#viewVisitType";
        };

        VisitTypeCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.visitTypeViewModel.bbModel = model;
            this.visitTypeViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.visitTypeView.el)[0]);
            ko.applyBindings(this.visitTypeViewModel, this.visitTypeView.el);
        };
        return VisitTypeCtrl;
    })(helper.Controller);
    exports.VisitTypeCtrl = VisitTypeCtrl;
});
