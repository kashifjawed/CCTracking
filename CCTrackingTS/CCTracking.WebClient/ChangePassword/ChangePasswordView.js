/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "../App", "marionette", "jquery", "knockout", "text!./ChangePassword.html"], function(require, exports, helper, APP) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./ChangePassword.html"/>
    var _ = require('underscore');

    var templateView = require("text!./ChangePassword.html");

    // View Model
    var ChangePasswordViewModel = (function (_super) {
        __extends(ChangePasswordViewModel, _super);
        function ChangePasswordViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return ChangePasswordViewModel;
    })(helper.ViewModel);
    exports.ChangePasswordViewModel = ChangePasswordViewModel;

    var ChangePasswordView = (function (_super) {
        __extends(ChangePasswordView, _super);
        function ChangePasswordView(options) {
            this.template = templateView;
            this.events = {
                "submit": "ChangePassword"
            };
            this.App = APP.Application.getInstance();
            _super.call(this, options);
        }
        ChangePasswordView.prototype.ChangePassword = function (e) {
            e.preventDefault();
            this.trigger("ChangePassword");
        };
        return ChangePasswordView;
    })(helper.Views.MvvmView);
    exports.ChangePasswordView = ChangePasswordView;
});
