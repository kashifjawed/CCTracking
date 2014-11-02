/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./ResetPasswordView", "../Dtos/LoginDto", "../DAL/Login", "marionette", "jquery", "knockout", "text!./ResetPassword.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./ResetPassword.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var ResetPasswordCtrl = (function (_super) {
        __extends(ResetPasswordCtrl, _super);
        function ResetPasswordCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.LoginDto();
            this.resetPasswordViewModel = new views.ResetPasswordViewModel(this.backboneModel, this);
            this.resetPasswordView = new views.ResetPasswordView({ viewModel: this.resetPasswordViewModel });
        }
        ResetPasswordCtrl.prototype.Load = function () {
            var _this = this;
            this.resetPasswordView = new views.ResetPasswordView();
            var layout = this.app.AppLayout;

            //this.ContainerRegion.show(layout);
            this.app.MainRegion.show(this.resetPasswordView);
            this.resetPasswordView.on("ResetPassword", function () {
                return _this.ResetPassword(_this.resetPasswordViewModel.bbModel);
            });
        };

        ResetPasswordCtrl.prototype.ResetPassword = function (login) {
            var _this = this;
            debugger;
            var password = $("#txtPassword").val();
            var resetPAssword = $("#txtResetPassword").val();
            var reEnterPassword = $("#txtReEnterPassword").val();

            var appObj = this.app.request("AppGlobalSetting");
            if (resetPAssword != reEnterPassword) {
                helper.ShowModalPopup("danger", "Reset Password", "New Password and Re-Enter Password are not same.<br>Please enter same password.");
                return;
            } else {
                var appObj = this.app.request("AppGlobalSetting");
                login.set("userName", appObj.get("UserName"));
                login.set("password", $("#txtPassword").val());
                login.set("resetPassword", $("#txtResetPassword").val());
                var promise = DAL.ChangePasswrd(login);

                promise.done(function (p) {
                    return _this.Authenticated(p);
                });
            }
        };

        //TODO: this method should be inside controller
        ResetPasswordCtrl.prototype.Authenticated = function (loginDto) {
            var result = new Backbone.Model(loginDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Reset Password", "Due to some technical reason password have not been reset successfully!<br> Pelase try later");
                return;
            } else {
                helper.ShowModalPopup("success", "Reset Password", "Password has been reset successfully");
            }
        };
        return ResetPasswordCtrl;
    })(helper.Controller);
    exports.ResetPasswordCtrl = ResetPasswordCtrl;
});
