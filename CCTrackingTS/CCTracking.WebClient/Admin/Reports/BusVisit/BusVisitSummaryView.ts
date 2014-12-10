/// <reference path="../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusVisitSummaryTmpl.html"/>
/// <amd-dependency path="text!./BusVisitDetail.html"/>

var _ = require('underscore');
import helper = require("../../../Helper");
import searchCtrl = require("./BusVisitSummaryCtrl");
var templateView = require("text!./BusVisitSummaryTmpl.html");
var detailView = require("text!./BusVisitDetail.html");
import application = require("../../../App");
var app;


export class BusVisitSummaryCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = BusVisitSummaryItemView;
        options.template = templateView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblSearch tbody";
        this.events = {
            "click .jsSearch": "Search",
            "click .jsCancel": "Cancel"
        }
        
        super(options);
    }
    //templateHelpers = () => {
    //    return {
    //        reportTitle: () => {
    //            return "something goes here..";
    //        }
    //    }
    //}

    //Search(e) {
    //    e.preventDefault();
    //    this.trigger("DriverSummary");
    //}

    //initialize() {
    //    alert('initialize..');
    //    $("#txtBookingDate").datepicker();
    //}

}

export class BusVisitDetailCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = BusVisitDetailItemView;
        options.template = detailView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblBusVisitDetail tbody";
        this.events = {
            "click .jsSearch": "Search",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
}

export class BusVisitSummaryItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            //"mouseover .jsShowDetail": "ShowDetail",
            "click .jsShowDetail": () => { this.ShowDetail(this.model.get("busId")); }
    };
        super(options);
    }
    ShowDetail(id:number) {
        //new userCtrl.UserCtrl().ShowDetail(this.model);
        this.trigger("BusVisitSummaryDetail", id);
    }
}

export class BusVisitDetailItemView extends helper.Views.ItemView {
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