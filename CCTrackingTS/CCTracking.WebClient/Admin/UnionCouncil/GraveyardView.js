/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./GraveyardTmpl.html", "text!./GraveyardGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./GraveyardTmpl.html"/>
    /// <amd-dependency path="text!./GraveyardGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./GraveyardTmpl.html");
    var templateGrid = require("text!./GraveyardGrid.html");

    var app;

    // View Model
    var GraveyardViewModel = (function (_super) {
        __extends(GraveyardViewModel, _super);
        function GraveyardViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return GraveyardViewModel;
    })(helper.ViewModel);
    exports.GraveyardViewModel = GraveyardViewModel;

    // View
    var GraveyardView = (function (_super) {
        __extends(GraveyardView, _super);
        function GraveyardView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        GraveyardView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveGraveyard");
        };
        GraveyardView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        GraveyardView.prototype.TestFunction = function () {
            alert("test function");
        };
        GraveyardView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveGraveyard");
            //this.trigger("TestEvent");
            //new driverCtrl.GraveyardCtrl().Save(this.viewModel.bbModel);
        };
        return GraveyardView;
    })(helper.Views.MvvmView);
    exports.GraveyardView = GraveyardView;

    var GraveyardCollectionView = (function (_super) {
        __extends(GraveyardCollectionView, _super);
        function GraveyardCollectionView(options) {
            options.itemView = GraveyardItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return GraveyardCollectionView;
    })(helper.Views.CompositeView);
    exports.GraveyardCollectionView = GraveyardCollectionView;

    var GraveyardItemView = (function (_super) {
        __extends(GraveyardItemView, _super);
        function GraveyardItemView(options) {
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
        GraveyardItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return GraveyardItemView;
    })(helper.Views.ItemView);
    exports.GraveyardItemView = GraveyardItemView;
});
