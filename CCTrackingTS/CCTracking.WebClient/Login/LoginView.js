/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "../App", "marionette", "jquery", "knockout", "text!./Login.html"], function(require, exports, helper, APP) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./Login.html"/>
    var _ = require('underscore');

    var templateView = require("text!./Login.html");

    // View Model
    var LoginViewModel = (function (_super) {
        __extends(LoginViewModel, _super);
        function LoginViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return LoginViewModel;
    })(helper.ViewModel);
    exports.LoginViewModel = LoginViewModel;

    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        function LoginView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Login"
            };
            this.App = APP.Application.getInstance();

            //this.App.vent.on("LoginCallback", this.Authenticated1);
            //this.App.reqres.setHandler("AppGlobalSetting", this.ConfigureGlobalSetting);
            _super.call(this, options);
        }
        LoginView.prototype.Login = function (e) {
            e.preventDefault();
            this.trigger("LoginUser");
        };
        return LoginView;
    })(helper.Views.MvvmView);
    exports.LoginView = LoginView;
});
