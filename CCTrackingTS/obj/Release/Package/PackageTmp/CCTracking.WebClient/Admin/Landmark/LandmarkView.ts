/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./LandmarkTmpl.html"/>
/// <amd-dependency path="text!./LandmarkGrid.html"/>

var _ = require('underscore');
import helper = require("../../Helper");
var templateView = require("text!./LandmarkTmpl.html");
var templateGrid = require("text!./LandmarkGrid.html");

import application = require("../../App");
var app;



// View Model
export class LandmarkViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
export class LandmarkView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = templateView;
        this.events = {
            "submit": "Save",
            "click .jsCancel": "Cancel"

        }
        super(options);
        //this.listenTo(this, "TestEvent", () => this.TestFunction());
    }
    close() {
        //alert("closeing this view");
        //this.off("SaveLandmark");
    }
    Cancel() {
        this.trigger("CancelForm");
    }
    TestFunction() {
        alert("test function");
    }
    Save(e) {
        e.preventDefault();
        this.trigger("SaveLandmark");
        //this.trigger("TestEvent");
        //new driverCtrl.LandmarkCtrl().Save(this.viewModel.bbModel);
    }
}

export class LandmarkCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = LandmarkItemView;
        options.template = templateGrid.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "tbody";
        super(options);
    }
}

export class LandmarkItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateGrid.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            "click .jsShowDetail": "ShowDetail"
        };
        super(options);
    }
    ShowDetail() {
        this.trigger("ShowDetail");
    }
}

