/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./UnionCouncilTmpl.html", "text!./UnionCouncilGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./UnionCouncilTmpl.html"/>
    /// <amd-dependency path="text!./UnionCouncilGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./UnionCouncilTmpl.html");
    var templateGrid = require("text!./UnionCouncilGrid.html");

    var app;

    // View Model
    var UnionCouncilViewModel = (function (_super) {
        __extends(UnionCouncilViewModel, _super);
        function UnionCouncilViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return UnionCouncilViewModel;
    })(helper.ViewModel);
    exports.UnionCouncilViewModel = UnionCouncilViewModel;

    // View
    var UnionCouncilView = (function (_super) {
        __extends(UnionCouncilView, _super);
        function UnionCouncilView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        UnionCouncilView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveUnionCouncil");
        };
        UnionCouncilView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        UnionCouncilView.prototype.TestFunction = function () {
            alert("test function");
        };
        UnionCouncilView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveUnionCouncil");
            //this.trigger("TestEvent");
            //new driverCtrl.UnionCouncilCtrl().Save(this.viewModel.bbModel);
        };
        return UnionCouncilView;
    })(helper.Views.MvvmView);
    exports.UnionCouncilView = UnionCouncilView;

    var UnionCouncilCollectionView = (function (_super) {
        __extends(UnionCouncilCollectionView, _super);
        function UnionCouncilCollectionView(options) {
            options.itemView = UnionCouncilItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return UnionCouncilCollectionView;
    })(helper.Views.CompositeView);
    exports.UnionCouncilCollectionView = UnionCouncilCollectionView;

    var UnionCouncilItemView = (function (_super) {
        __extends(UnionCouncilItemView, _super);
        function UnionCouncilItemView(options) {
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
        UnionCouncilItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return UnionCouncilItemView;
    })(helper.Views.ItemView);
    exports.UnionCouncilItemView = UnionCouncilItemView;
});
