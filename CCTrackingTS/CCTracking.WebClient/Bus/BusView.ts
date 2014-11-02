/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="knockout"/>
/// <amd-dependency path="datatablesBootstrap"/>
/// <amd-dependency path="text!CCTracking.WebClient/Bus/Bus.html"/>
/// <amd-dependency path="text!CCTracking.WebClient/Bus/BusGrid.html"/>

import helper = require("../Helper");
var busView = require("text!CCTracking.WebClient/Bus/Bus.html");
var busGridView = require("text!CCTracking.WebClient/Bus/BusGrid.html");

export class BusViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

export class BusView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = busView.getOuterHTML("#BusTemplate");
        super(options);
    }
}
