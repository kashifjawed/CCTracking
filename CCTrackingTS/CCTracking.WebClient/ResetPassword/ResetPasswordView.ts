/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

/// <amd-dependency path="text!./ResetPassword.html"/>

var _ = require('underscore');
import helper = require("../Helper");

var templateView = require("text!./ResetPassword.html");
import APP = require("../App");
import user = require("../ResetPassword/ResetPasswordView");


// View Model
export class ResetPasswordViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}


export class ResetPasswordView extends helper.Views.MvvmView {
    App: Marionette.Application;
    constructor(options?: any) {
        this.template = templateView;
        this.events = {
            "submit": "ResetPassword"
        }
        this.App = APP.Application.getInstance();
        super(options);
    }
    ResetPassword(e) {
        e.preventDefault();
        this.trigger("ResetPassword");
    }

    
}
