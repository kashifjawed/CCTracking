/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../App", "../../../Helper", "./BusVisitSummaryView", "../../../Dtos/BusVisitDto", "../../../DAL/BusVisit", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BusVisitSummaryCtrl = (function (_super) {
        __extends(BusVisitSummaryCtrl, _super);
        function BusVisitSummaryCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BusVisitSummaryDto();
            this.compositeModel = new Backbone.Model();
            this.backboneCollection = new Backbone.Collection([]);
            this.collectionView = new views.BusVisitSummaryCollectionView({ collection: this.backboneCollection, model: new Backbone.Model({ title1: "" }) });
            this.backboneCollection.reset([]);
        }
        BusVisitSummaryCtrl.prototype.ShowVisit = function () {
            var _this = this;
            this.isBusVisit = true;
            var deferred = DAL.GetAllSummary();
            deferred.done(function (p) {
                return _this.GetBusVisitSummaryCompleted(p);
            });
            this.collectionView.model = new Backbone.Model({ title1: "Visit" });
            this.app.MainRegion.show(this.collectionView);
            this.collectionView.listenTo(this.collectionView, "itemview:BusVisitSummaryDetail", function (view, id) {
                return _this.GetBusVisitDetial(id);
            });
        };
        BusVisitSummaryCtrl.prototype.ShowMilage = function () {
            var _this = this;
            this.isBusVisit = false;
            var deferred = DAL.GetAllMilageSummary();
            deferred.done(function (p) {
                return _this.GetBusVisitSummaryCompleted(p);
            });
            this.collectionView.model = new Backbone.Model({ title1: "Milage" });
            this.app.MainRegion.show(this.collectionView);
            this.collectionView.listenTo(this.collectionView, "itemview:BusVisitSummaryDetail", function (view, id) {
                return _this.GetBusVisitMilageDetial(id);
            });
        };

        BusVisitSummaryCtrl.prototype.GetBusVisitDetial = function (id) {
            var _this = this;
            var deferred = DAL.GetAllDetail(id);
            deferred.done(function (p) {
                return _this.GetBusVisitDetailCompleted(p);
            });
            //history.pushState(id,'title' + id);
        };

        BusVisitSummaryCtrl.prototype.GetBusVisitMilageDetial = function (id) {
            var _this = this;
            var deferred = DAL.GetAllMilageDetail(id);
            deferred.done(function (p) {
                return _this.GetBusVisitDetailCompleted(p);
            });
            //history.pushState(id,'title' + id);
        };

        BusVisitSummaryCtrl.prototype.GetBusVisitDetailCompleted = function (busVisitDetailDto) {
            var result = busVisitDetailDto["busVisitList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { driverDesc: result[i].driverDesc, centreDesc: result[i].centreDesc, vehicleNo: result[i].vehicleNo, visitDate: helper.FormatDateString(result[i].visitDate), visitInterval: result[i].visitInterval, bookingId: result[i].bookingId, milage: result[i].milage };
            }
            var bbCollection = new Backbone.Collection([]);
            var detailView = new views.BusVisitDetailCollectionView({ collection: bbCollection });
            this.app.MainRegion.show(detailView);
            bbCollection.reset(summary);
            if (this.isBusVisit) {
                location.href = "#busVisitDetail";
            } else {
                location.href = "#busVisitMilageDetail";
            }
        };

        BusVisitSummaryCtrl.prototype.GetBusVisitSummaryCompleted = function (busVisitSummaryDto) {
            //TODO:Hack - need rework
            var result = busVisitSummaryDto["busVisitList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { busId: result[i].busId, driverDesc: result[i].driverDesc, milage: result[i].milage, visitCount: result[i].visitCount, vehicleNo: result[i].vehicleNo };
            }
            this.backboneCollection.reset(summary);
            //history.pushState(result[0].driverId, 'title' + result[0].driverId);
        };

        BusVisitSummaryCtrl.prototype.Cancel = function () {
            if (this.isBusVisit) {
                location.href = "#busVisitSummary";
            } else {
                location.href = "#busVisitMilageSummary";
            }
        };
        return BusVisitSummaryCtrl;
    })(helper.Controller);
    exports.BusVisitSummaryCtrl = BusVisitSummaryCtrl;
});
//# sourceMappingURL=BusVisitSummaryCtrl.js.map
