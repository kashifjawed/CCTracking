/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./UnionCouncilView", "../../Dtos/UnionCouncilDto", "../../DAL/UnionCouncil", "marionette", "jquery", "knockout", "text!./UnionCouncilTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./UnionCouncilTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var UnionCouncilCtrl = (function (_super) {
        __extends(UnionCouncilCtrl, _super);
        function UnionCouncilCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.UnionCouncilDto();
            this.unionCouncilViewModel = new views.UnionCouncilViewModel(this.backboneModel, this);
            this.unionCouncilView = new views.UnionCouncilView({ viewModel: this.unionCouncilViewModel });

            //this.unionCouncilView.on("SaveUnionCouncil", () => this.Save(this.unionCouncilView.model));
            this.collection = new dto.Models.UnionCouncilCollection({});
            this.collectionView = new views.UnionCouncilCollectionView({ collection: this.collection });
            //this.events.listento
        }
        UnionCouncilCtrl.prototype.Show = function () {
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

        UnionCouncilCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            //var model = new dto.Models.UnionCouncilDto();
            var model = this.backboneModel;
            this.unionCouncilViewModel.bbModel = model;
            this.unionCouncilViewModel.model = kb.viewModel(model);

            // debugger;
            model.set("name", "");
            model.set("landmarkIdSelected", "");
            model.set("landmarkList", lookupResponse.landmark);
            model.set("isActive", "1");

            this.unionCouncilViewModel = new views.UnionCouncilViewModel(model, this);
            this.unionCouncilView = new views.UnionCouncilView({ viewModel: this.unionCouncilViewModel });
            this.unionCouncilView.on("SaveUnionCouncil", function () {
                return _this.Save(_this.unionCouncilViewModel.bbModel);
            });

            this.unionCouncilView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.layout = app.AppLayout;
            this.app.MainRegion.show(this.unionCouncilView);
            //this.GetAll();
        };

        UnionCouncilCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll();
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        UnionCouncilCtrl.prototype.GetByIdCompleted = function (unionCouncilDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(unionCouncilDto["unionCouncilModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.unionCouncilView = new views.UnionCouncilView({ viewModel: this.unionCouncilViewModel });
            this.unionCouncilView.on("SaveUnionCouncil", function () {
                return _this.Save(_this.unionCouncilViewModel.bbModel);
            });
            this.unionCouncilView.on("CancelForm", function () {
                return _this.Cancel();
            });

            //this.unionCouncilView.trigger("TestEvent");
            //app = application.Application.getInstance();
            this.app.MainRegion.show(this.unionCouncilView);
            //this.GetAll();
            //this.GetAllCompletedNew(this.collection);
        };

        UnionCouncilCtrl.prototype.Save = function (unionCouncil) {
            var _this = this;
            //debugger;
            var appObj = this.app.request("AppGlobalSetting");
            unionCouncil.set("modifiedBy", appObj.get("Id"));
            unionCouncil.set("landmarkId", unionCouncil.get("landmarkIdSelected").id);
            unionCouncil.set("isActive", unionCouncil.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(unionCouncil);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        UnionCouncilCtrl.prototype.GetAllCompleted = function (unionCouncil) {
            var _this = this;
            //app = application.Application.getInstance();
            //  debugger;
            this.collection.reset(unionCouncil["unionCouncilList"]);
            this.collectionView = new views.UnionCouncilCollectionView({ collection: this.collection });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.app.MainRegion.show(this.collectionView);
        };

        UnionCouncilCtrl.prototype.SaveCompleted = function (unionCouncilDto) {
            this.backboneModel = new Backbone.Model(unionCouncilDto);
            var model = this.backboneModel;

            //console.log(loginResponse);
            if (unionCouncilDto == undefined) {
                //alert("UnionCouncil Detail have not been saved successfully!");
                helper.ShowModalPopup("danger", "Union Council", "UnionCouncil Detail have not been saved successfully!");
            } else {
                //alert("Record has been saved successfully with UnionCouncil ID : " + unionCouncilDto["id"]);
                helper.ShowModalPopup("success", "Union Council", "Record has been saved successfully with UnionCouncil ID : " + unionCouncilDto["id"]);
                this.Cancel();
            }
        };

        UnionCouncilCtrl.prototype.Cancel = function () {
            window.location.href = "#viewUnionCouncil";
        };

        UnionCouncilCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);

            model.set("isActive", model.get("isActive") ? "1" : "0");

            this.unionCouncilViewModel.bbModel = model;
            this.unionCouncilViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.unionCouncilView.el)[0]);
            ko.applyBindings(this.unionCouncilViewModel, this.unionCouncilView.el);
        };
        return UnionCouncilCtrl;
    })(helper.Controller);
    exports.UnionCouncilCtrl = UnionCouncilCtrl;
});
