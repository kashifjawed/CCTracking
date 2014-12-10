/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusVisitSummaryTmpl.html"/>
/// <amd-dependency path="text!./BusVisitDetail.html"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../Helper", "marionette", "jquery", "jqueryUI", "knockout", "text!./BusVisitSummaryTmpl.html", "text!./BusVisitDetail.html"], function(require, exports, helper) {
    var _ = require('underscore');

    var templateView = require("text!./BusVisitSummaryTmpl.html");
    var detailView = require("text!./BusVisitDetail.html");

    var app;

    var BusVisitSummaryCollectionView = (function (_super) {
        __extends(BusVisitSummaryCollectionView, _super);
        function BusVisitSummaryCollectionView(options) {
            options.itemView = BusVisitSummaryItemView;
            options.template = templateView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblSearch tbody";
            this.events = {
                "click .jsSearch": "Search",
                "click .jsCancel": "Cancel"
            };

            _super.call(this, options);
        }
        return BusVisitSummaryCollectionView;
    })(helper.Views.CompositeView);
    exports.BusVisitSummaryCollectionView = BusVisitSummaryCollectionView;

    var BusVisitDetailCollectionView = (function (_super) {
        __extends(BusVisitDetailCollectionView, _super);
        function BusVisitDetailCollectionView(options) {
            options.itemView = BusVisitDetailItemView;
            options.template = detailView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblBusVisitDetail tbody";
            this.events = {
                "click .jsSearch": "Search",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        return BusVisitDetailCollectionView;
    })(helper.Views.CompositeView);
    exports.BusVisitDetailCollectionView = BusVisitDetailCollectionView;

    var BusVisitSummaryItemView = (function (_super) {
        __extends(BusVisitSummaryItemView, _super);
        function BusVisitSummaryItemView(options) {
            var _this = this;
            if (!options)
                options = {};
            options.template = templateView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                //"mouseover .jsShowDetail": "ShowDetail",
                "click .jsShowDetail": function () {
                    _this.ShowDetail(_this.model.get("busId"));
                }
            };
            _super.call(this, options);
        }
        BusVisitSummaryItemView.prototype.ShowDetail = function (id) {
            //new userCtrl.UserCtrl().ShowDetail(this.model);
            this.trigger("BusVisitSummaryDetail", id);
        };
        return BusVisitSummaryItemView;
    })(helper.Views.ItemView);
    exports.BusVisitSummaryItemView = BusVisitSummaryItemView;

    var BusVisitDetailItemView = (function (_super) {
        __extends(BusVisitDetailItemView, _super);
        function BusVisitDetailItemView(options) {
            if (!options)
                options = {};
            options.template = detailView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {};
            _super.call(this, options);
        }
        BusVisitDetailItemView.prototype.ShowDetail = function (id) {
            //this.trigger("DriverSummaryDetail", id);
        };
        return BusVisitDetailItemView;
    })(helper.Views.ItemView);
    exports.BusVisitDetailItemView = BusVisitDetailItemView;
});
//# sourceMappingURL=BusVisitSummaryView.js.map
