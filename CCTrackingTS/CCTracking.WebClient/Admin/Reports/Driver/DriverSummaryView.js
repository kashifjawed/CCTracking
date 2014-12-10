/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./DriverSummaryTmpl.html"/>
/// <amd-dependency path="text!./DriverDetail.html"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../Helper", "marionette", "jquery", "jqueryUI", "knockout", "text!./DriverSummaryTmpl.html", "text!./DriverDetail.html"], function(require, exports, helper) {
    var _ = require('underscore');

    var templateView = require("text!./DriverSummaryTmpl.html");
    var detailView = require("text!./DriverDetail.html");

    var app;

    var DriverSummaryCollectionView = (function (_super) {
        __extends(DriverSummaryCollectionView, _super);
        function DriverSummaryCollectionView(options) {
            options.itemView = DriverSummaryItemView;
            options.template = templateView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblSearch tbody";
            this.events = {
                "click .jsSearch": "Search",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        return DriverSummaryCollectionView;
    })(helper.Views.CompositeView);
    exports.DriverSummaryCollectionView = DriverSummaryCollectionView;

    var DriverDetailCollectionView = (function (_super) {
        __extends(DriverDetailCollectionView, _super);
        function DriverDetailCollectionView(options) {
            options.itemView = DriverDetailItemView;
            options.template = detailView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "#tblDriverDetail tbody";
            this.events = {
                "click .jsSearch": "Search",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        return DriverDetailCollectionView;
    })(helper.Views.CompositeView);
    exports.DriverDetailCollectionView = DriverDetailCollectionView;

    var DriverSummaryItemView = (function (_super) {
        __extends(DriverSummaryItemView, _super);
        function DriverSummaryItemView(options) {
            var _this = this;
            if (!options)
                options = {};
            options.template = templateView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                //"mouseover .jsShowDetail": "ShowDetail",
                "click .jsShowDetail": function () {
                    _this.ShowDetail(_this.model.get("driverId"));
                }
            };
            _super.call(this, options);
        }
        DriverSummaryItemView.prototype.ShowDetail = function (id) {
            //new userCtrl.UserCtrl().ShowDetail(this.model);
            this.trigger("DriverSummaryDetail", id);
        };
        return DriverSummaryItemView;
    })(helper.Views.ItemView);
    exports.DriverSummaryItemView = DriverSummaryItemView;

    var DriverDetailItemView = (function (_super) {
        __extends(DriverDetailItemView, _super);
        function DriverDetailItemView(options) {
            if (!options)
                options = {};
            options.template = detailView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {};
            _super.call(this, options);
        }
        DriverDetailItemView.prototype.ShowDetail = function (id) {
            //this.trigger("DriverSummaryDetail", id);
        };
        return DriverDetailItemView;
    })(helper.Views.ItemView);
    exports.DriverDetailItemView = DriverDetailItemView;
});
//# sourceMappingURL=DriverSummaryView.js.map
