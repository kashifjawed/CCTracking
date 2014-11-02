/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./AlkhidmatCentreTmpl.html", "text!./AlkhidmatCentreGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./AlkhidmatCentreTmpl.html"/>
    /// <amd-dependency path="text!./AlkhidmatCentreGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./AlkhidmatCentreTmpl.html");
    var templateGrid = require("text!./AlkhidmatCentreGrid.html");

    var app;

    // View Model
    var StationViewModel = (function (_super) {
        __extends(StationViewModel, _super);
        function StationViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return StationViewModel;
    })(helper.ViewModel);
    exports.StationViewModel = StationViewModel;

    // View
    var StationView = (function (_super) {
        __extends(StationView, _super);
        function StationView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        StationView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveAlkhidmatCentre");
        };
        StationView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        StationView.prototype.TestFunction = function () {
            alert("test function");
        };
        StationView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveAlkhidmatCentre");
            //this.trigger("TestEvent");
            //new stationCtrl.StationCtrl().Save(this.viewModel.bbModel);
        };
        return StationView;
    })(helper.Views.MvvmView);
    exports.StationView = StationView;

    var StationCollectionView = (function (_super) {
        __extends(StationCollectionView, _super);
        function StationCollectionView(options) {
            options.itemView = StationItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return StationCollectionView;
    })(helper.Views.CompositeView);
    exports.StationCollectionView = StationCollectionView;

    var StationItemView = (function (_super) {
        __extends(StationItemView, _super);
        function StationItemView(options) {
            if (!options)
                options = {};
            options.template = templateGrid.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                "click .jsShowDetail": "ShowDetail"
            };
            _super.call(this, options);
        }
        StationItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return StationItemView;
    })(helper.Views.ItemView);
    exports.StationItemView = StationItemView;
});
