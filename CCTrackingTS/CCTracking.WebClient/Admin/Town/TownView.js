/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./TownTmpl.html", "text!./TownGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./TownTmpl.html"/>
    /// <amd-dependency path="text!./TownGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./TownTmpl.html");
    var templateGrid = require("text!./TownGrid.html");

    var app;

    // View Model
    var TownViewModel = (function (_super) {
        __extends(TownViewModel, _super);
        function TownViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return TownViewModel;
    })(helper.ViewModel);
    exports.TownViewModel = TownViewModel;

    // View
    var TownView = (function (_super) {
        __extends(TownView, _super);
        function TownView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        TownView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveTown");
        };
        TownView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        TownView.prototype.TestFunction = function () {
            alert("test function");
        };
        TownView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveTown");
            //this.trigger("TestEvent");
            //new driverCtrl.TownCtrl().Save(this.viewModel.bbModel);
        };
        return TownView;
    })(helper.Views.MvvmView);
    exports.TownView = TownView;

    var TownCollectionView = (function (_super) {
        __extends(TownCollectionView, _super);
        function TownCollectionView(options) {
            options.itemView = TownItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return TownCollectionView;
    })(helper.Views.CompositeView);
    exports.TownCollectionView = TownCollectionView;

    var TownItemView = (function (_super) {
        __extends(TownItemView, _super);
        function TownItemView(options) {
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
        TownItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return TownItemView;
    })(helper.Views.ItemView);
    exports.TownItemView = TownItemView;
});
