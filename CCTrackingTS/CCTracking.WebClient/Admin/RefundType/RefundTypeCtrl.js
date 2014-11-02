/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./RefundTypeView", "../../Dtos/RefundTypeDto", "../../DAL/RefundType", "marionette", "jquery", "knockout", "text!./RefundTypeTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./RefundTypeTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var RefundTypeCtrl = (function (_super) {
        __extends(RefundTypeCtrl, _super);
        function RefundTypeCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.RefundTypeDto();
            this.refundTypeViewModel = new views.RefundTypeViewModel(this.backboneModel, this);
            this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });

            //this.refundTypeView.on("SaveRefundType", () => this.Save(this.refundTypeView.model));
            this.collection = new dto.Models.RefundTypeCollection({});
            this.collectionView = new views.RefundTypeCollectionView({ collection: this.collection });
            //this.events.listento
        }
        RefundTypeCtrl.prototype.Show = function () {
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

        RefundTypeCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.refundTypeViewModel.bbModel = model;
            this.refundTypeViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("isActive", "1");

            this.refundTypeViewModel = new views.RefundTypeViewModel(model, this);
            this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });
            this.refundTypeView.on("SaveRefundType", function () {
                return _this.Save(_this.refundTypeViewModel.bbModel);
            });

            this.refundTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.refundTypeView);
            //this.GetAll();
        };

        RefundTypeCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        RefundTypeCtrl.prototype.GetByIdCompleted = function (refundTypeDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(refundTypeDto["refundTypeModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.refundTypeView = new views.RefundTypeView({ viewModel: this.refundTypeViewModel });
            this.refundTypeView.on("SaveRefundType", function () {
                return _this.Save(_this.refundTypeViewModel.bbModel);
            });
            this.refundTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.refundTypeView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.refundTypeView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        RefundTypeCtrl.prototype.Save = function (refundType) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            refundType.set("modifiedBy", appObj.get("Id"));
            refundType.set("isActive", refundType.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(refundType);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        RefundTypeCtrl.prototype.GetAllCompleted = function (refundType) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(refundType["refundTypeList"]);
            this.collectionView = new views.RefundTypeCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        RefundTypeCtrl.prototype.SaveCompleted = function (refundTypeDto) {
            this.backboneModel = new Backbone.Model(refundTypeDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (refundTypeDto == undefined) {
                //alert("RefundType Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "Refund Type", "RefundType Detail have not been saved successfully!");
            } else {
                // alert("Record has been saved successfully with RefundType ID : " + refundTypeDto["id"]);
                helper.ShowModalPopup("success", "Refund Type", "Record has been saved successfully with RefundType ID : " + refundTypeDto["id"]);
                this.Cancel();
            }
        };

        RefundTypeCtrl.prototype.Cancel = function () {
            window.location.href = "#viewRefundType";
        };

        RefundTypeCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.refundTypeViewModel.bbModel = model;
            this.refundTypeViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.refundTypeView.el)[0]);
            ko.applyBindings(this.refundTypeViewModel, this.refundTypeView.el);
        };
        return RefundTypeCtrl;
    })(helper.Controller);
    exports.RefundTypeCtrl = RefundTypeCtrl;
});
