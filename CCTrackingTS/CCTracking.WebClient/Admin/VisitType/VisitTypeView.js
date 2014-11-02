/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./VisitTypeTmpl.html", "text!./VisitTypeGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./VisitTypeTmpl.html"/>
    /// <amd-dependency path="text!./VisitTypeGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./VisitTypeTmpl.html");
    var templateGrid = require("text!./VisitTypeGrid.html");

    var app;

    // View Model
    var VisitTypeViewModel = (function (_super) {
        __extends(VisitTypeViewModel, _super);
        function VisitTypeViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return VisitTypeViewModel;
    })(helper.ViewModel);
    exports.VisitTypeViewModel = VisitTypeViewModel;

    // View
    var VisitTypeView = (function (_super) {
        __extends(VisitTypeView, _super);
        function VisitTypeView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        VisitTypeView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SaveVisitType");
        };
        VisitTypeView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        VisitTypeView.prototype.TestFunction = function () {
            alert("test function");
        };
        VisitTypeView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SaveVisitType");
            //this.trigger("TestEvent");
            //new driverCtrl.VisitTypeCtrl().Save(this.viewModel.bbModel);
        };
        return VisitTypeView;
    })(helper.Views.MvvmView);
    exports.VisitTypeView = VisitTypeView;

    var VisitTypeCollectionView = (function (_super) {
        __extends(VisitTypeCollectionView, _super);
        function VisitTypeCollectionView(options) {
            options.itemView = VisitTypeItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return VisitTypeCollectionView;
    })(helper.Views.CompositeView);
    exports.VisitTypeCollectionView = VisitTypeCollectionView;

    var VisitTypeItemView = (function (_super) {
        __extends(VisitTypeItemView, _super);
        function VisitTypeItemView(options) {
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
        VisitTypeItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return VisitTypeItemView;
    })(helper.Views.ItemView);
    exports.VisitTypeItemView = VisitTypeItemView;
});
