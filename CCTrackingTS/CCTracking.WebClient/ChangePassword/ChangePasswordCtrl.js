/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./ChangePasswordView", "../Dtos/LoginDto", "../DAL/Login", "marionette", "jquery", "knockout", "text!./ChangePassword.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./ChangePassword.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var ChangePasswordCtrl = (function (_super) {
        __extends(ChangePasswordCtrl, _super);
        function ChangePasswordCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.LoginDto();
            this.changePasswordViewModel = new views.ChangePasswordViewModel(this.backboneModel, this);
            this.changePasswordView = new views.ChangePasswordView({ viewModel: this.changePasswordViewModel });
        }
        ChangePasswordCtrl.prototype.Load = function () {
            var _this = this;
            this.changePasswordView = new views.ChangePasswordView();
            var layout = this.app.AppLayout;

            //this.ContainerRegion.show(layout);
            this.app.MainRegion.show(this.changePasswordView);
            this.changePasswordView.on("ChangePassword", function () {
                return _this.ChangePassword(_this.changePasswordViewModel.bbModel);
            });
        };

        ChangePasswordCtrl.prototype.ChangePassword = function (login) {
            var _this = this;
            var password = $("#txtPassword").val();
            var resetPassword = $("#txtResetPassword").val();
            var reEnterPassword = $("#txtReEnterPassword").val();

            if (resetPassword != reEnterPassword) {
                helper.ShowModalPopup("danger", "Reset Password", "New Password and Re-Enter Password are not same.<br>Please enter same password.");
                return;
            } else {
                var appObj = this.app.request("AppGlobalSetting");
                login.set("userName", appObj.get("UserName"));
                login.set("password", password);
                login.set("changePassword", resetPassword);
                var promise = DAL.ChangePasswrd(login);

                promise.done(function (p) {
                    return _this.Authenticated(p);
                });
            }
        };

        //TODO: this method should be inside controller
        ChangePasswordCtrl.prototype.Authenticated = function (loginDto) {
            var result = new Backbone.Model(loginDto);
            if (result == undefined) {
                helper.ShowModalPopup("danger", "Reset Password", "Due to some technical reason password have not been reset successfully!<br> Pelase try later");
                return;
            } else if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Reset Password", result.get("errorMessage"));
                return;
            } else {
                helper.ShowModalPopup("success", "Reset Password", "Password has been reset successfully");
            }
        };
        return ChangePasswordCtrl;
    })(helper.Controller);
    exports.ChangePasswordCtrl = ChangePasswordCtrl;
});
