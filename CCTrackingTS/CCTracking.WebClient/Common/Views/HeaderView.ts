/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/Header.html"/>
var templateView = require("text!CCTracking.WebClient/Common/Templates/Header.html");
import helper = require("../../Helper");
import application = require("../../App");
var app;
export class HeaderItemView extends Marionette.ItemView {
    constructor(options?) {
        if (!options)
            options = {};
        app = application.Application.getInstance();
        options.template = templateView.getOuterHTML("#SiteHeader");
        this.templateHelpers = ()=> {
            return {
                isAdminRole:()=> {
                    return app.request("AppGlobalSetting").get("IsAdmin");
                }
            }
        }
        super(options);
    }
}