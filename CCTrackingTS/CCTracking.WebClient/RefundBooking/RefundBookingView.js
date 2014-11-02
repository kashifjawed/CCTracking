/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "marionette", "jquery", "knockout", "text!./RefundBookingTmpl.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./RefundBookingTmpl.html"/>
    var _ = require('underscore');

    var templateView = require("text!./RefundBookingTmpl.html");

    var app;

    var RefundBookingViewModel = (function (_super) {
        __extends(RefundBookingViewModel, _super);
        function RefundBookingViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return RefundBookingViewModel;
    })(helper.ViewModel);
    exports.RefundBookingViewModel = RefundBookingViewModel;

    var RefundBookingView = (function (_super) {
        __extends(RefundBookingView, _super);
        function RefundBookingView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        RefundBookingView.prototype.Cancel = function () {
            this.trigger("Event:CancelForm");
        };
        RefundBookingView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("Event:SaveForm");
        };
        return RefundBookingView;
    })(helper.Views.MvvmView);
    exports.RefundBookingView = RefundBookingView;
});
//# sourceMappingURL=RefundBookingView.js.map
