/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./CauseOfDeathTmpl.html", "text!./CauseOfDeathGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./CauseOfDeathTmpl.html"/>
    /// <amd-dependency path="text!./CauseOfDeathGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./CauseOfDeathTmpl.html");
    var templateGrid = require("text!./CauseOfDeathGrid.html");

    var app;

    // View Model
    var CauseOfDeathViewModel = (function (_super) {
        __extends(CauseOfDeathViewModel, _super);
        function CauseOfDeathViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return CauseOfDeathViewModel;
    })(helper.ViewModel);
    exports.CauseOfDeathViewModel = CauseOfDeathViewModel;

    // View
    var CauseOfDeathView = (function (_super) {
        __extends(CauseOfDeathView, _super);
        function CauseOfDeathView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        CauseOfDeathView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveCauseOfDeath");
        };
        CauseOfDeathView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        CauseOfDeathView.prototype.TestFunction = function () {
            alert("test function");
        };
        CauseOfDeathView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveCauseOfDeath");
            //this.trigger("TestEvent");
            //new driverCtrl.CauseOfDeathCtrl().Save(this.viewModel.bbModel);
        };
        return CauseOfDeathView;
    })(helper.Views.MvvmView);
    exports.CauseOfDeathView = CauseOfDeathView;

    var CauseOfDeathCollectionView = (function (_super) {
        __extends(CauseOfDeathCollectionView, _super);
        function CauseOfDeathCollectionView(options) {
            options.itemView = CauseOfDeathItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return CauseOfDeathCollectionView;
    })(helper.Views.CompositeView);
    exports.CauseOfDeathCollectionView = CauseOfDeathCollectionView;

    var CauseOfDeathItemView = (function (_super) {
        __extends(CauseOfDeathItemView, _super);
        function CauseOfDeathItemView(options) {
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
        CauseOfDeathItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return CauseOfDeathItemView;
    })(helper.Views.ItemView);
    exports.CauseOfDeathItemView = CauseOfDeathItemView;
});
