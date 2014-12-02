/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./PaymentTypeView", "../../Dtos/PaymentTypeDto", "../../DAL/PaymentType", "marionette", "jquery", "knockout", "text!./PaymentTypeTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./PaymentTypeTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var PaymentTypeCtrl = (function (_super) {
        __extends(PaymentTypeCtrl, _super);
        function PaymentTypeCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.PaymentTypeDto();
            this.paymentTypeViewModel = new views.PaymentTypeViewModel(this.backboneModel, this);
            this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });

            //this.paymentTypeView.on("SavePaymentType", () => this.Save(this.paymentTypeView.model));
            this.collection = new dto.Models.PaymentTypeCollection({});
            this.collectionView = new views.PaymentTypeCollectionView({ collection: this.collection });
            //this.events.listento
        }
        PaymentTypeCtrl.prototype.Show = function () {
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

        PaymentTypeCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;
            this.paymentTypeViewModel.bbModel = model;
            this.paymentTypeViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("isActive", "");

            this.paymentTypeViewModel = new views.PaymentTypeViewModel(model, this);
            this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });
            this.paymentTypeView.on("SavePaymentType", function () {
                return _this.Save(_this.paymentTypeViewModel.bbModel);
            });

            this.paymentTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.paymentTypeView);
            //this.GetAll();
        };

        PaymentTypeCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        PaymentTypeCtrl.prototype.GetByIdCompleted = function (paymentTypeDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(paymentTypeDto["paymentTypeModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.paymentTypeView = new views.PaymentTypeView({ viewModel: this.paymentTypeViewModel });
            this.paymentTypeView.on("SavePaymentType", function () {
                return _this.Save(_this.paymentTypeViewModel.bbModel);
            });
            this.paymentTypeView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.paymentTypeView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.paymentTypeView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        PaymentTypeCtrl.prototype.Save = function (paymentType) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            paymentType.set("modifiedBy", appObj.get("Id"));
            paymentType.set("isActive", paymentType.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(paymentType);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        PaymentTypeCtrl.prototype.GetAllCompleted = function (paymentType) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(paymentType["paymentTypeList"]);
            this.collectionView = new views.PaymentTypeCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        PaymentTypeCtrl.prototype.SaveCompleted = function (paymentTypeDto) {
            var result = new Backbone.Model(paymentTypeDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Booking", "Due to some technical reason Payment Type have not been saved successfully!<br> Pelase try later");
            } else {
                //alert("Record has been saved successfully with PaymentType ID : " + paymentTypeDto["id"]);
                helper.ShowModalPopup("success", "Payment Type", "Record has been saved successfully with PaymentType ID : " + paymentTypeDto["id"]);

                this.Cancel();
            }
        };

        PaymentTypeCtrl.prototype.Cancel = function () {
            window.location.href = "#viewPaymentType";
        };

        PaymentTypeCtrl.prototype.UIBinding = function (model) {
            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.paymentTypeViewModel.bbModel = model;
            this.paymentTypeViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.paymentTypeView.el)[0]);
            ko.applyBindings(this.paymentTypeViewModel, this.paymentTypeView.el);
        };
        return PaymentTypeCtrl;
    })(helper.Controller);
    exports.PaymentTypeCtrl = PaymentTypeCtrl;
});
