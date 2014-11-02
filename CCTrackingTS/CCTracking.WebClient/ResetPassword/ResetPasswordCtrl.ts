/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./ResetPassword.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./ResetPasswordView");
import dto = require("../Dtos/LoginDto");
import DAL = require("../DAL/Login");

import appObjectDto = require("../Dtos/AppObjectDto");


import uc = require("../User/UserCtrl");

export class ResetPasswordCtrl extends helper.Controller {
    app: any;
    resetPasswordViewModel: views.ResetPasswordViewModel;
    resetPasswordView: views.ResetPasswordView;
    backboneModel: Backbone.Model;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.LoginDto();
        this.resetPasswordViewModel = new views.ResetPasswordViewModel(this.backboneModel, this);
        this.resetPasswordView = new views.ResetPasswordView({ viewModel: this.resetPasswordViewModel });
    }

    Load() {

        this.resetPasswordView = new views.ResetPasswordView();
        var layout = this.app.AppLayout;
        //this.ContainerRegion.show(layout);
        this.app.MainRegion.show(this.resetPasswordView);
        this.resetPasswordView.on("ResetPassword", () => this.ResetPassword(this.resetPasswordViewModel.bbModel));
    }

    ResetPassword(login: any) {
       
        var password = $("#txtPassword").val();
        var resetPAssword = $("#txtResetPassword").val();
        var reEnterPassword = $("#txtReEnterPassword").val();

        var appObj = this.app.request("AppGlobalSetting");
        if (resetPAssword != reEnterPassword) {
            helper.ShowModalPopup("danger", "Reset Password", "New Password and Re-Enter Password are not same.<br>Please enter same password.");
            return;
        }
        else {
            var appObj = this.app.request("AppGlobalSetting");
            login.set("userName", appObj.get("UserName"));
            login.set("password", $("#txtPassword").val());
            login.set("resetPassword", $("#txtResetPassword").val());
            var promise = DAL.ChangePasswrd(login);

            promise.done((p) => this.Authenticated(p));
        }
    }


    //TODO: this method should be inside controller
    Authenticated(loginDto: dto.Models.LoginDto) {
        var result = new Backbone.Model(loginDto);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Reset Password", "Due to some technical reason password have not been reset successfully!<br> Pelase try later");
            return;
        }
        else {
            helper.ShowModalPopup("success", "Reset Password", "Password has been reset successfully");
        }
    }
}
