/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./HomeView");
//import dto = require("CCTracking.WebClient/Dtos/SearchDto");
//import DAL = require("../DAL/Search");


export class HomeCtrl extends helper.Controller {
    homeItemView: views.HomeItemView;
    app:any;
    constructor() {
        super();
        this.app = application.Application.getInstance();
        this.homeItemView = new views.HomeItemView();
    }

    Show() {
        this.app.MainRegion.show(this.homeItemView);
    }
}

