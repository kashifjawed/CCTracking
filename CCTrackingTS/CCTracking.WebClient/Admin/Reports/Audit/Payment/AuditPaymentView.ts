/// <reference path="../../../../../Scripts/typings/require/require.d.ts" />

/// <reference path="../../../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./AuditPayment.html"/>



var _ = require('underscore');
import helper = require("../../../../Helper");
//import searchCtrl = require("./AuditBookingCtrl");
var templateView = require("text!./AuditPayment.html");

import application = require("../../../../App");
var app;

export class AuditPaymentCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = AuditPaymentItemView;
        options.template = templateView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblAuditPayment tbody";
        this.events = {
            "click .jsSearchAuditPayment": "Search",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }

    Search(e) {
        e.preventDefault();
        this.trigger("Event:AuditPayment", {fromDate: this.model.get("fromDate"),toDate:this.model.get("toDate")});
    }

    Cancel(e) {
        e.preventDefault();
        this.model.set("fromDate", "");
        this.model.set("toDate", "");
    }
}

export class AuditPaymentItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        if (options.model.get("rowCounter") % 2 == 0) {
            options.className = "info";
        } else {
            options.className = "warning";
        }
        //options.events = {
        //    "click .jsShowDetail": () => { this.ShowDetail(this.model.get("driverId")); }
        //};
        super(options);
    }
    ShowDetail(id: number) {
        //this.trigger("DriverSummaryDetail", id);
    }
}

