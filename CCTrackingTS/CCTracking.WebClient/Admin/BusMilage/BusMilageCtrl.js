/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./BusMilageView", "../../Dtos/BusMilageDto", "../../DAL/BusMilage", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BusMilageCtrl = (function (_super) {
        __extends(BusMilageCtrl, _super);
        function BusMilageCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BusMilageDto();
            this.viewModel = new views.BusMilageViewModel(this.backboneModel, this);
            this.collection = new dto.Models.BusMilageCollection({ id: "", vehicleNo: "", centreDesc: "", totalMilage: "", totalVisits: "" });
            this.collectionView = new views.BusMilageCollectionView({ collection: this.collection });
            this.compositeModel = new Backbone.Model();
        }
        BusMilageCtrl.prototype.SimpleLoad = function () {
            var _this = this;
            var model = this.backboneModel;

            model.set("fromVisitDate", helper.FormatDateString(Date.now()));
            model.set("toVisitDate", helper.FormatDateString(Date.now()));
            this.compositeModel = model;

            this.collectionView.model = this.compositeModel;
            this.collectionView.listenTo(this.collectionView, "Event:BusMilage", function () {
                return _this.BusMilage(model);
            });
            this.app.MainRegion.show(this.collectionView);

            var vm = kb.viewModel(this.compositeModel);

            var fromVisitDate = $('#txtFromVisitDate')[0];
            ko.cleanNode(fromVisitDate);
            ko.applyBindings(vm, fromVisitDate);

            var toVisitDate = $('#txtToVisitDate')[0];
            ko.cleanNode(toVisitDate);
            ko.applyBindings(vm, toVisitDate);
        };

        BusMilageCtrl.prototype.BusMilage = function (busMilageDto) {
            var _this = this;
            var deferred = DAL.GetByCriteria(busMilageDto);
            deferred.done(function (p) {
                return _this.GetByCriteriaCompleted(p);
            });
        };

        BusMilageCtrl.prototype.GetByCriteriaCompleted = function (model) {
            debugger;
            this.collection.reset(model["busMilageList"]);
        };

        BusMilageCtrl.prototype.Cancel = function () {
            window.location.href = "#viewBusMilage";
        };

        BusMilageCtrl.prototype.UIBinding = function (model) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            model.set("landmarkList", lookupResponse.landmark);
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            model.set("landmarkIdSelected", landmark[0]);

            this.viewModel.bbModel = model;
        };
        return BusMilageCtrl;
    })(helper.Controller);
    exports.BusMilageCtrl = BusMilageCtrl;
});
