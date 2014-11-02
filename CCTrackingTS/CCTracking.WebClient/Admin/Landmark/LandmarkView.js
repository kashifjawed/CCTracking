/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./LandmarkTmpl.html", "text!./LandmarkGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./LandmarkTmpl.html"/>
    /// <amd-dependency path="text!./LandmarkGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./LandmarkTmpl.html");
    var templateGrid = require("text!./LandmarkGrid.html");

    var app;

    // View Model
    var LandmarkViewModel = (function (_super) {
        __extends(LandmarkViewModel, _super);
        function LandmarkViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return LandmarkViewModel;
    })(helper.ViewModel);
    exports.LandmarkViewModel = LandmarkViewModel;

    // View
    var LandmarkView = (function (_super) {
        __extends(LandmarkView, _super);
        function LandmarkView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        LandmarkView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveLandmark");
        };
        LandmarkView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        LandmarkView.prototype.TestFunction = function () {
            alert("test function");
        };
        LandmarkView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveLandmark");
            //this.trigger("TestEvent");
            //new driverCtrl.LandmarkCtrl().Save(this.viewModel.bbModel);
        };
        return LandmarkView;
    })(helper.Views.MvvmView);
    exports.LandmarkView = LandmarkView;

    var LandmarkCollectionView = (function (_super) {
        __extends(LandmarkCollectionView, _super);
        function LandmarkCollectionView(options) {
            options.itemView = LandmarkItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return LandmarkCollectionView;
    })(helper.Views.CompositeView);
    exports.LandmarkCollectionView = LandmarkCollectionView;

    var LandmarkItemView = (function (_super) {
        __extends(LandmarkItemView, _super);
        function LandmarkItemView(options) {
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
        LandmarkItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return LandmarkItemView;
    })(helper.Views.ItemView);
    exports.LandmarkItemView = LandmarkItemView;
});
