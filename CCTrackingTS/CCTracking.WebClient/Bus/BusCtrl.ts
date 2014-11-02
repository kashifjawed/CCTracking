/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

import application = require("../App");
import helper = require("../Helper");
import views = require("./BusView");
import dto = require("../Dtos/BusDto");
import DAL = require("../DAL/Bus");

var app;
export class BusCtrl extends helper.Controller {
    busViewModel: views.BusViewModel;
    busView: views.BusView;
    constructor() {
        app = application.Application.getInstance();
        super();
    }
    Show() {
        var model = new dto.Models.BusDto();
        this.busViewModel = new views.BusViewModel(model, this);
        this.busView = new views.BusView({ viewModel: this.busViewModel });
        app.AppLayout.DetailRegion.close();
        app.AppLayout.MainRegion.show(this.busView);
    }
}