/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./DriverTmpl.html", "text!./DriverGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./DriverTmpl.html"/>
    /// <amd-dependency path="text!./DriverGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./DriverTmpl.html");
    var templateGrid = require("text!./DriverGrid.html");

    var app;

    // View Model
    var DriverViewModel = (function (_super) {
        __extends(DriverViewModel, _super);
        function DriverViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return DriverViewModel;
    })(helper.ViewModel);
    exports.DriverViewModel = DriverViewModel;

    // View
    var DriverView = (function (_super) {
        __extends(DriverView, _super);
        function DriverView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        DriverView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveDriver");
        };
        DriverView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        DriverView.prototype.TestFunction = function () {
            alert("test function");
        };
        DriverView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveDriver");
            //this.trigger("TestEvent");
            //new driverCtrl.DriverCtrl().Save(this.viewModel.bbModel);
        };
        return DriverView;
    })(helper.Views.MvvmView);
    exports.DriverView = DriverView;

    var DriverCollectionView = (function (_super) {
        __extends(DriverCollectionView, _super);
        function DriverCollectionView(options) {
            options.itemView = DriverItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return DriverCollectionView;
    })(helper.Views.CompositeView);
    exports.DriverCollectionView = DriverCollectionView;

    var DriverItemView = (function (_super) {
        __extends(DriverItemView, _super);
        function DriverItemView(options) {
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
        DriverItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return DriverItemView;
    })(helper.Views.ItemView);
    exports.DriverItemView = DriverItemView;
});
//# sourceMappingURL=DriverView.js.map
