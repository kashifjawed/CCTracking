/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./TrackingDeviceTmpl.html", "text!./TrackingDeviceGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./TrackingDeviceTmpl.html"/>
    /// <amd-dependency path="text!./TrackingDeviceGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./TrackingDeviceTmpl.html");
    var templateGrid = require("text!./TrackingDeviceGrid.html");

    var app;

    // View Model
    var TrackingDeviceViewModel = (function (_super) {
        __extends(TrackingDeviceViewModel, _super);
        function TrackingDeviceViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return TrackingDeviceViewModel;
    })(helper.ViewModel);
    exports.TrackingDeviceViewModel = TrackingDeviceViewModel;

    // View
    var TrackingDeviceView = (function (_super) {
        __extends(TrackingDeviceView, _super);
        function TrackingDeviceView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        TrackingDeviceView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveTrackingDevice");
        };
        TrackingDeviceView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        TrackingDeviceView.prototype.TestFunction = function () {
            alert("test function");
        };
        TrackingDeviceView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveTrackingDevice");
            //this.trigger("TestEvent");
            //new driverCtrl.TrackingDeviceCtrl().Save(this.viewModel.bbModel);
        };
        return TrackingDeviceView;
    })(helper.Views.MvvmView);
    exports.TrackingDeviceView = TrackingDeviceView;

    var TrackingDeviceCollectionView = (function (_super) {
        __extends(TrackingDeviceCollectionView, _super);
        function TrackingDeviceCollectionView(options) {
            options.itemView = TrackingDeviceItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return TrackingDeviceCollectionView;
    })(helper.Views.CompositeView);
    exports.TrackingDeviceCollectionView = TrackingDeviceCollectionView;

    var TrackingDeviceItemView = (function (_super) {
        __extends(TrackingDeviceItemView, _super);
        function TrackingDeviceItemView(options) {
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
        TrackingDeviceItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return TrackingDeviceItemView;
    })(helper.Views.ItemView);
    exports.TrackingDeviceItemView = TrackingDeviceItemView;
});
