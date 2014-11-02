/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./PaymentTypeTmpl.html", "text!./PaymentTypeGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./PaymentTypeTmpl.html"/>
    /// <amd-dependency path="text!./PaymentTypeGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./PaymentTypeTmpl.html");
    var templateGrid = require("text!./PaymentTypeGrid.html");

    var app;

    // View Model
    var PaymentTypeViewModel = (function (_super) {
        __extends(PaymentTypeViewModel, _super);
        function PaymentTypeViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return PaymentTypeViewModel;
    })(helper.ViewModel);
    exports.PaymentTypeViewModel = PaymentTypeViewModel;

    // View
    var PaymentTypeView = (function (_super) {
        __extends(PaymentTypeView, _super);
        function PaymentTypeView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        PaymentTypeView.prototype.close = function () {
            //alert("closeing this view");
            //this.off("SavePaymentType");
        };
        PaymentTypeView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        PaymentTypeView.prototype.TestFunction = function () {
            alert("test function");
        };
        PaymentTypeView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("SavePaymentType");
            //this.trigger("TestEvent");
            //new driverCtrl.PaymentTypeCtrl().Save(this.viewModel.bbModel);
        };
        return PaymentTypeView;
    })(helper.Views.MvvmView);
    exports.PaymentTypeView = PaymentTypeView;

    var PaymentTypeCollectionView = (function (_super) {
        __extends(PaymentTypeCollectionView, _super);
        function PaymentTypeCollectionView(options) {
            options.itemView = PaymentTypeItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            _super.call(this, options);
        }
        return PaymentTypeCollectionView;
    })(helper.Views.CompositeView);
    exports.PaymentTypeCollectionView = PaymentTypeCollectionView;

    var PaymentTypeItemView = (function (_super) {
        __extends(PaymentTypeItemView, _super);
        function PaymentTypeItemView(options) {
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
        PaymentTypeItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return PaymentTypeItemView;
    })(helper.Views.ItemView);
    exports.PaymentTypeItemView = PaymentTypeItemView;
});
