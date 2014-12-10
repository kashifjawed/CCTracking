var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./BusVisitView", "../Dtos/BusVisitDto", "../DAL/BusVisit", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BusVisitCtrl = (function (_super) {
        __extends(BusVisitCtrl, _super);
        function BusVisitCtrl() {
            _super.call(this);

            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BusVisitDto();

            this.collection = new dto.Models.BusVisitCollection([]);
            this.collectionView = new views.BusVisitCollectionView({ collection: this.collection });
            this.compositeModel = new Backbone.Model();
        }
        BusVisitCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            if (url.indexOf("id=") > -1) {
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.Load();
            }
        };

        BusVisitCtrl.prototype.SimpleLoad = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            this.compositeModel.set("busList", lookupResponse.bus);
            this.compositeModel.set("busSelected", "");
            this.collectionView.model = this.compositeModel;

            this.collectionView.listenTo(this.collectionView, "Event:SearchVisit", function (busId) {
                return _this.SearchVisit(busId);
            });
            this.app.MainRegion.show(this.collectionView);

            var vm = kb.viewModel(this.compositeModel);
            vm.setOptionDisable = this.collectionView.setOptionDisable;
            var element = $('#ddlBusDetails')[0];
            ko.cleanNode(element);
            ko.applyBindings(vm, element);
        };

        BusVisitCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;

            this.view = new views.BusVisitView();

            this.view.on("Event:SaveForm", function (busVisitModel) {
                return _this.Save(busVisitModel);
            });
            this.view.on("Event:CancelForm", function () {
                return _this.Cancel();
            });
            this.app.MainRegion.show(this.view);
        };

        BusVisitCtrl.prototype.GetAll = function () {
            var _this = this;
            var deferred = DAL.GetAll(-1);
            deferred.done(function (p) {
                return _this.GetAllCompleted1(p);
            });
        };

        BusVisitCtrl.prototype.GetByIdCompleted = function (dto) {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            this.backboneModel = new Backbone.Model(dto["busVisitModel"]);
            var model = this.backboneModel;

            if (model.get("visitDate") != null && model.get("visitDate").trim() != "")
                model.set("visitDate", helper.FormatDateString(model.get("visitDate")));

            this.view = new views.BusVisitView(model);
            this.view.on("Event:SaveForm", function (busVisitModel) {
                return _this.Save(busVisitModel);
            });
            this.view.on("Event:CancelForm", function () {
                return _this.Cancel();
            });
            this.app.MainRegion.show(this.view);
        };

        BusVisitCtrl.prototype.Save = function (model) {
            var _this = this;
            var appObj = this.app.request("AppGlobalSetting");
            model.set("modifiedBy", appObj.get("Id"));
            model.set("isBookingCompleted", model.get("isBookingCompleted") == "1" ? true : false);
            var deferred = DAL.Save(model);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        BusVisitCtrl.prototype.GetAllCompleted = function (model) {
            var busVisits = _.map(model["busVisitList"], function (item) {
                item.visitDate = helper.FormatDateString(item.visitDate);
                return item;
            });
            this.collection.reset(busVisits);
        };

        BusVisitCtrl.prototype.GetAllCompleted1 = function (model) {
            var _this = this;
            this.compositeModel = new Backbone.Model();
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            this.compositeModel.set("busList", lookupResponse.bus);
            this.compositeModel.set("busSelected", "");
            this.collection = new Backbone.Collection(model["busVisitList"]);

            this.collectionView = new views.BusVisitCollectionView({ collection: this.collection, model: this.compositeModel });
            this.collectionView.on("itemview:ShowDetail", function (view) {
                return _this.GetByIdCompleted(view.model);
            });
            this.collectionView.listenTo(this.collectionView, "Event:SearchVisit", function (busId) {
                return _this.SearchVisit(busId);
            });
            this.app.MainRegion.show(this.collectionView);

            var vm = kb.viewModel(this.compositeModel);
            var element = $('#ddlBusDetails')[0];
            ko.cleanNode(element);
            ko.applyBindings(vm, element);
        };

        BusVisitCtrl.prototype.SearchVisit = function (busId) {
            var _this = this;
            var deferred = DAL.GetAll(busId);
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        BusVisitCtrl.prototype.SaveCompleted = function (dto) {
            this.backboneModel = new Backbone.Model(dto);
            var model = this.backboneModel;

            if (dto == undefined) {
                helper.ShowModalPopup("danger", "Bus Visit", "Bus visit have not been saved successfully!");
            } else {
                helper.ShowModalPopup("success", "Bus Visit", "Record has been saved successfully with Bus Visit ID : " + dto["id"]);

                this.Cancel();
            }
            this.app.vent.trigger("Event:UpdateSummary");
        };

        BusVisitCtrl.prototype.Cancel = function () {
            window.location.href = "#viewBusVisit";
        };

        BusVisitCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);
            this.viewModel.bbModel = model;
        };
        return BusVisitCtrl;
    })(helper.Controller);
    exports.BusVisitCtrl = BusVisitCtrl;
});
