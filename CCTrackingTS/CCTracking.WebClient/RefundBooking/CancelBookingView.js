/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "marionette", "jquery", "knockout", "text!./CancelBookingTmpl.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./CancelBookingTmpl.html"/>
    var _ = require('underscore');

    var templateView = require("text!./CancelBookingTmpl.html");

    var app;

    var CancelBookingViewModel = (function (_super) {
        __extends(CancelBookingViewModel, _super);
        function CancelBookingViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return CancelBookingViewModel;
    })(helper.ViewModel);
    exports.CancelBookingViewModel = CancelBookingViewModel;

    var CancelBookingView = (function (_super) {
        __extends(CancelBookingView, _super);
        function CancelBookingView(options) {
            this.template = templateView;
            _super.call(this, options);
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
        }
        CancelBookingView.prototype.Cancel = function () {
            this.trigger("Event:CancelForm");
        };
        CancelBookingView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("Event:SaveForm");
        };
        return CancelBookingView;
    })(helper.Views.MvvmView);
    exports.CancelBookingView = CancelBookingView;
});
//# sourceMappingURL=CancelBookingView.js.map
