/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./BusTmpl.html", "text!./BusGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BusTmpl.html"/>
    /// <amd-dependency path="text!./BusGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./BusTmpl.html");
    var templateGrid = require("text!./BusGrid.html");

    var app;

    // View Model
    var BusViewModel = (function (_super) {
        __extends(BusViewModel, _super);
        function BusViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return BusViewModel;
    })(helper.ViewModel);
    exports.BusViewModel = BusViewModel;

    // View
    var BusView = (function (_super) {
        __extends(BusView, _super);
        function BusView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        BusView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveBus");
        };
        BusView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        BusView.prototype.TestFunction = function () {
            alert("test function");
        };
        BusView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveBus");
            //this.trigger("TestEvent");
            //new busCtrl.BusCtrl().Save(this.viewModel.bbModel);
        };
        return BusView;
    })(helper.Views.MvvmView);
    exports.BusView = BusView;

    var BusCollectionView = (function (_super) {
        __extends(BusCollectionView, _super);
        function BusCollectionView(options) {
            options.itemView = BusItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return BusCollectionView;
    })(helper.Views.CompositeView);
    exports.BusCollectionView = BusCollectionView;

    var BusItemView = (function (_super) {
        __extends(BusItemView, _super);
        function BusItemView(options) {
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
        BusItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return BusItemView;
    })(helper.Views.ItemView);
    exports.BusItemView = BusItemView;
});
