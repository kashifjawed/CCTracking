var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../App", "../../../Helper", "./DriverSummaryView", "../../../Dtos/DriverDto", "../../../DAL/Driver", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var DriverSummaryCtrl = (function (_super) {
        __extends(DriverSummaryCtrl, _super);
        function DriverSummaryCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.DriverSummaryDto();
            this.compositeModel = new Backbone.Model();
            this.backboneCollection = new Backbone.Collection([]);
            this.collectionView = new views.DriverSummaryCollectionView({ collection: this.backboneCollection });
            this.backboneCollection.reset([]);
        }
        DriverSummaryCtrl.prototype.Show = function () {
            var _this = this;
            var deferred = DAL.GetAllSummary();
            deferred.done(function (p) {
                return _this.GetDrvierSummaryCompleted(p);
            });
            this.app.MainRegion.show(this.collectionView);
            this.collectionView.listenTo(this.collectionView, "itemview:DriverSummaryDetail", function (view, id) {
                return _this.GetDriverDetial(id);
            });
        };

        DriverSummaryCtrl.prototype.GetDriverDetial = function (id) {
            var _this = this;
            var deferred = DAL.GetAllDetail(id);
            deferred.done(function (p) {
                return _this.GetDriverDetailCompleted(p);
            });
        };

        DriverSummaryCtrl.prototype.GetDriverDetailCompleted = function (driverDetailDto) {
            var result = driverDetailDto["driverList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { driverName: result[i].driverName, vehicleNo: result[i].vehicleNo, visitDate: helper.FormatDateString(result[i].visitDate), visitInterval: result[i].visitInterval, bookingId: result[i].bookingId };
            }
            var bbCollection = new Backbone.Collection([]);
            var detailView = new views.DriverDetailCollectionView({ collection: bbCollection });
            this.app.MainRegion.show(detailView);
            bbCollection.reset(summary);
            location.href = "#driverDetail";
        };

        DriverSummaryCtrl.prototype.GetDrvierSummaryCompleted = function (driverSummaryDto) {
            var result = driverSummaryDto["driverList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { driverId: result[i].driverId, driverName: result[i].driverName, milage: result[i].milage, visitCount: result[i].visitCount };
            }
            this.backboneCollection.reset(summary);
        };

        DriverSummaryCtrl.prototype.Cancel = function () {
            window.location.href = "#driverSummary";
        };
        return DriverSummaryCtrl;
    })(helper.Controller);
    exports.DriverSummaryCtrl = DriverSummaryCtrl;
});
