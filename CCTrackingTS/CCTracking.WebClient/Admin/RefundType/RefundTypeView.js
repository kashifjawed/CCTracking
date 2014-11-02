/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./RefundTypeTmpl.html", "text!./RefundTypeGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./RefundTypeTmpl.html"/>
    /// <amd-dependency path="text!./RefundTypeGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./RefundTypeTmpl.html");
    var templateGrid = require("text!./RefundTypeGrid.html");

    var app;

    // View Model
    var RefundTypeViewModel = (function (_super) {
        __extends(RefundTypeViewModel, _super);
        function RefundTypeViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return RefundTypeViewModel;
    })(helper.ViewModel);
    exports.RefundTypeViewModel = RefundTypeViewModel;

    // View
    var RefundTypeView = (function (_super) {
        __extends(RefundTypeView, _super);
        function RefundTypeView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        RefundTypeView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveRefundType");
        };
        RefundTypeView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        RefundTypeView.prototype.TestFunction = function () {
            alert("test function");
        };
        RefundTypeView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveRefundType");
            //this.trigger("TestEvent");
            //new driverCtrl.RefundTypeCtrl().Save(this.viewModel.bbModel);
        };
        return RefundTypeView;
    })(helper.Views.MvvmView);
    exports.RefundTypeView = RefundTypeView;

    var RefundTypeCollectionView = (function (_super) {
        __extends(RefundTypeCollectionView, _super);
        function RefundTypeCollectionView(options) {
            options.itemView = RefundTypeItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return RefundTypeCollectionView;
    })(helper.Views.CompositeView);
    exports.RefundTypeCollectionView = RefundTypeCollectionView;

    var RefundTypeItemView = (function (_super) {
        __extends(RefundTypeItemView, _super);
        function RefundTypeItemView(options) {
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
        RefundTypeItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return RefundTypeItemView;
    })(helper.Views.ItemView);
    exports.RefundTypeItemView = RefundTypeItemView;
});
