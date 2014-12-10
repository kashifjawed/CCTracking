/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

/// <amd-dependency path="text!./ChangePassword.html"/>

var _ = require('underscore');
import helper = require("../Helper");

var templateView = require("text!./ChangePassword.html");
import APP = require("../App");
import user = require("../ChangePassword/ChangePasswordView");


// View Model
export class ChangePasswordViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}


export class ChangePasswordView extends helper.Views.MvvmView {
    App: Marionette.Application;
    constructor(options?: any) {
        this.template = templateView;
        this.events = {
            "submit": "ChangePassword"
        }
        this.App = APP.Application.getInstance();
        super(options);
    }
    ChangePassword(e) {
        e.preventDefault();
        this.trigger("ChangePassword");
    }

    
}
