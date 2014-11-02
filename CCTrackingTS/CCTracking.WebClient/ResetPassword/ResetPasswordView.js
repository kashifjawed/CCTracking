/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "../App", "marionette", "jquery", "knockout", "text!./ResetPassword.html"], function(require, exports, helper, APP) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./ResetPassword.html"/>
    var _ = require('underscore');

    var templateView = require("text!./ResetPassword.html");

    // View Model
    var ResetPasswordViewModel = (function (_super) {
        __extends(ResetPasswordViewModel, _super);
        function ResetPasswordViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return ResetPasswordViewModel;
    })(helper.ViewModel);
    exports.ResetPasswordViewModel = ResetPasswordViewModel;

    var ResetPasswordView = (function (_super) {
        __extends(ResetPasswordView, _super);
        function ResetPasswordView(options) {
            this.template = templateView;
            this.events = {
                "submit": "ResetPassword"
            };
            this.App = APP.Application.getInstance();
            _super.call(this, options);
        }
        ResetPasswordView.prototype.ResetPassword = function (e) {
            e.preventDefault();
            this.trigger("ResetPassword");
        };
        return ResetPasswordView;
    })(helper.Views.MvvmView);
    exports.ResetPasswordView = ResetPasswordView;
});
