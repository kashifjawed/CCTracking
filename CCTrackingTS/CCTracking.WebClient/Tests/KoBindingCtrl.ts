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
import views = require("./KoBindingView");
//import dto = require("CCTracking.WebClient/Dtos/PaymentDto");
//import busVisitDto = require("CCTracking.WebClient/Dtos/BusVisitDto");
//import DAL = require("../DAL/Payment");

var app;

export class KoBindingCtrl extends helper.Controller {
    //koBindingViewModel: views.KoBindingViewModel;
    koBindingView: views.KoBindingView;
    constructor() {
        app = application.Application.getInstance();
        super();
    }

    Show() {
        var bbmodel = new Backbone.Model();//({ one: 10, two: 20, sum: 0 });
        bbmodel.set("one", 10);
        bbmodel.set("two", 20);
        bbmodel.set("sum", 30);

        this.koBindingView = new views.KoBindingView({ model: bbmodel });
        app.AppLayout.MainRegion.show(this.koBindingView);
    }
}
