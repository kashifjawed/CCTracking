/// <reference path="../../../../../Scripts/typings/require/require.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../../Helper", "marionette", "jquery", "jqueryUI", "knockout", "text!./AuditPayment.html"], function(require, exports, helper) {
    /// <reference path="../../../../../Scripts/typings/marionette/marionette.d.ts" />
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="jqueryUI"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./AuditPayment.html"/>
    var _ = require('underscore');

    //import searchCtrl = require("./AuditBookingCtrl");
    var templateView = require("text!./AuditPayment.html");

    var app;

    var AuditPaymentCollectionView = (function (_super) {
        __extends(AuditPaymentCollectionView, _super);
        function AuditPaymentCollectionView(options) {
            options.itemView = AuditPaymentItemView;
            options.template = templateView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblAuditPayment tbody";
            this.events = {
                "click .jsSearchAuditPayment": "Search",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        AuditPaymentCollectionView.prototype.Search = function (e) {
            e.preventDefault();
            this.trigger("Event:AuditPayment", { fromDate: this.model.get("fromDate"), toDate: this.model.get("toDate") });
        };

        AuditPaymentCollectionView.prototype.Cancel = function (e) {
            e.preventDefault();
            this.model.set("fromDate", "");
            this.model.set("toDate", "");
        };
        return AuditPaymentCollectionView;
    })(helper.Views.CompositeView);
    exports.AuditPaymentCollectionView = AuditPaymentCollectionView;

    var AuditPaymentItemView = (function (_super) {
        __extends(AuditPaymentItemView, _super);
        function AuditPaymentItemView(options) {
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
        AuditPaymentItemView.prototype.ShowDetail = function (id) {
            //this.trigger("DriverSummaryDetail", id);
        };
        return AuditPaymentItemView;
    })(helper.Views.ItemView);
    exports.AuditPaymentItemView = AuditPaymentItemView;
});
//# sourceMappingURL=AuditPaymentView.js.map
