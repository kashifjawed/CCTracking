/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./DriverSummaryTmpl.html"/>
/// <amd-dependency path="text!./DriverDetail.html"/>

var _ = require('underscore');
import helper = require("../../../Helper");
import searchCtrl = require("./DriverSummaryCtrl");
var templateView = require("text!./DriverSummaryTmpl.html");
var detailView = require("text!./DriverDetail.html");
import application = require("../../../App");
var app;


export class DriverSummaryCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = DriverSummaryItemView;
        options.template = templateView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblSearch tbody";
        this.events = {
            "click .jsSearch": "Search",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
    //Search(e) {
    //    e.preventDefault();
    //    this.trigger("DriverSummary");
    //}

    //initialize() {
    //    alert('initialize..');
    //    $("#txtBookingDate").datepicker();
    //}

}

export class DriverDetailCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = DriverDetailItemView;
        options.template = detailView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblDriverDetail tbody";
        this.events = {
            "click .jsSearch": "Search",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
}

export class DriverSummaryItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            //"mouseover .jsShowDetail": "ShowDetail",
            "click .jsShowDetail": () => { this.ShowDetail(this.model.get("driverId")); }
    };
        super(options);
    }
    ShowDetail(id:number) {
        //new userCtrl.UserCtrl().ShowDetail(this.model);
        this.trigger("DriverSummaryDetail", id);
    }
}

export class DriverDetailItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = detailView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            //"mouseover .jsShowDetail": "ShowDetail",
            //"click .jsShowDetail": () => { this.ShowDetail(this.model.get("driverId")); }
        };
        super(options);
    }
    ShowDetail(id: number) {
        //this.trigger("DriverSummaryDetail", id);
    }
}