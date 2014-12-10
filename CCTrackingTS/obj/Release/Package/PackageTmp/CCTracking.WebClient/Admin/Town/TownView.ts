/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./TownTmpl.html"/>
/// <amd-dependency path="text!./TownGrid.html"/>

var _ = require('underscore');
import helper = require("../../Helper");
var templateView = require("text!./TownTmpl.html");
var templateGrid = require("text!./TownGrid.html");

import application = require("../../App");
var app;



// View Model
export class TownViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
export class TownView extends helper.Views.MvvmView {
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
        //this.off("SaveTown");
    }
    Cancel() {
        this.trigger("CancelForm");
    }
    TestFunction() {
        alert("test function");
    }
    Save(e) {
        e.preventDefault();
        this.trigger("SaveTown");
        //this.trigger("TestEvent");
        //new driverCtrl.TownCtrl().Save(this.viewModel.bbModel);
    }
}

export class TownCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = TownItemView;
        options.template = templateGrid.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "tbody";
        super(options);
    }
}

export class TownItemView extends helper.Views.ItemView {
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

