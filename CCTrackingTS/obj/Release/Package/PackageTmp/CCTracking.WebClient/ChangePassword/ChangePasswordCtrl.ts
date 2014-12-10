/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./ChangePassword.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./ChangePasswordView");
import dto = require("../Dtos/LoginDto");
import DAL = require("../DAL/Login");

import appObjectDto = require("../Dtos/AppObjectDto");


import uc = require("../User/UserCtrl");

export class ChangePasswordCtrl extends helper.Controller {
    app: any;
    changePasswordViewModel: views.ChangePasswordViewModel;
    changePasswordView: views.ChangePasswordView;
    backboneModel: Backbone.Model;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.LoginDto();
        this.changePasswordViewModel = new views.ChangePasswordViewModel(this.backboneModel, this);
        this.changePasswordView = new views.ChangePasswordView({ viewModel: this.changePasswordViewModel });
    }

    Load() {

        this.changePasswordView = new views.ChangePasswordView();
        var layout = this.app.AppLayout;
        //this.ContainerRegion.show(layout);
        this.app.MainRegion.show(this.changePasswordView);
        this.changePasswordView.on("ChangePassword", () => this.ChangePassword(this.changePasswordViewModel.bbModel));
    }

    ChangePassword(login: any) {
        var password = $("#txtPassword").val();
        var resetPassword = $("#txtResetPassword").val();
        var reEnterPassword = $("#txtReEnterPassword").val();
        
        if (resetPassword != reEnterPassword) {
            helper.ShowModalPopup("danger", "Reset Password", "New Password and Re-Enter Password are not same.<br>Please enter same password.");
            return;
        }
        else {
            var appObj = this.app.request("AppGlobalSetting");
            login.set("userName", appObj.get("UserName"));
            login.set("password", password);
            login.set("changePassword", resetPassword);
            var promise = DAL.ChangePasswrd(login);

            promise.done((p) => this.Authenticated(p));
        }
    }


    //TODO: this method should be inside controller
    Authenticated(loginDto: dto.Models.LoginDto) {
        var result = new Backbone.Model(loginDto);
        if (result == undefined ) {
            helper.ShowModalPopup("danger", "Reset Password", "Due to some technical reason password have not been reset successfully!<br> Pelase try later");
            return;
        }
        else if (result.get("errorMessage") != undefined  && result.get("errorMessage").trim() != "") {
           helper.ShowModalPopup("danger", "Reset Password", result.get("errorMessage"));
            return;
        }
        else {
            helper.ShowModalPopup("success", "Reset Password", "Password has been reset successfully");
        }
    }
}
