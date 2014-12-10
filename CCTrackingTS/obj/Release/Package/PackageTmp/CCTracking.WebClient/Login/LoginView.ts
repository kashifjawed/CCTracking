/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

/// <amd-dependency path="text!./Login.html"/>

var _ = require('underscore');
import helper = require("../Helper");

var templateView = require("text!./Login.html");
import APP = require("../App");
import user = require("../User/UserView");


// View Model
export class LoginViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}


export class LoginView extends helper.Views.MvvmView {
    App: Marionette.Application;
    constructor(options?: any) {
        this.template = templateView;
        this.events = {
            "submit": "Login"
        }
        this.App = APP.Application.getInstance();
        //this.App.vent.on("LoginCallback", this.Authenticated1);
        //this.App.reqres.setHandler("AppGlobalSetting", this.ConfigureGlobalSetting);
        super(options);
    }
    Login(e) {
        e.preventDefault();
        this.trigger("LoginUser");
    }

    
}
