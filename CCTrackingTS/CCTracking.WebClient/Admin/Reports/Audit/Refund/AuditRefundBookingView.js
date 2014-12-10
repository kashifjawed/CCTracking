/// <reference path="../../../../../Scripts/typings/require/require.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../../Helper", "marionette", "jquery", "jqueryUI", "knockout", "text!./AuditRefundBooking.html"], function(require, exports, helper) {
    /// <reference path="../../../../../Scripts/typings/marionette/marionette.d.ts" />
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="jqueryUI"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./AuditRefundBooking.html"/>
    var _ = require('underscore');

    //import searchCtrl = require("./AuditBookingCtrl");
    var templateView = require("text!./AuditRefundBooking.html");

    var app;

    var AuditRefundBookingCollectionView = (function (_super) {
        __extends(AuditRefundBookingCollectionView, _super);
        function AuditRefundBookingCollectionView(options) {
            options.itemView = AuditRefundBookingItemView;
            options.template = templateView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblAuditRefundBooking tbody";
            this.events = {
                "click .jsSearchAuditRefundBooking": "Search",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        AuditRefundBookingCollectionView.prototype.Search = function (e) {
            e.preventDefault();
            this.trigger("Event:AuditRefundBooking", { fromDate: this.model.get("fromDate"), toDate: this.model.get("toDate") });
        };

        AuditRefundBookingCollectionView.prototype.Cancel = function (e) {
            e.preventDefault();
            this.model.set("fromDate", "");
            this.model.set("toDate", "");
        };
        return AuditRefundBookingCollectionView;
    })(helper.Views.CompositeView);
    exports.AuditRefundBookingCollectionView = AuditRefundBookingCollectionView;

    var AuditRefundBookingItemView = (function (_super) {
        __extends(AuditRefundBookingItemView, _super);
        function AuditRefundBookingItemView(options) {
            if (!options)
                options = {};
            options.template = templateView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            if (options.model.get("rowCounter") % 2 == 0) {
                options.className = "info";
            } else {
                options.className = "warning";
            }

            //options.events = {
            //    "click .jsShowDetail": () => { this.ShowDetail(this.model.get("driverId")); }
            //};
            _super.call(this, options);
        }
        AuditRefundBookingItemView.prototype.ShowDetail = function (id) {
            //this.trigger("DriverSummaryDetail", id);
        };
        return AuditRefundBookingItemView;
    })(helper.Views.ItemView);
    exports.AuditRefundBookingItemView = AuditRefundBookingItemView;
});
//# sourceMappingURL=AuditRefundBookingView.js.map
