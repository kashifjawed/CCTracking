﻿/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./AdminSearchBookingTmpl.html"/>

var _ = require('underscore');
import helper = require("../../Helper");
import searchCtrl = require("./AdminSearchBookingCtrl");
var templateView = require("text!./AdminSearchBookingTmpl.html");
import application = require("../../App");
var app;

export class SearchViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}


export class SearchView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = templateView;//templateView.getOuterHTML("#searchFilter");
        //this.events = {
        //    "click .jsSearch": "Search",
        //    "click .jsCancel": "Cancel"
        //}
        super(options);
    }
    onDomRefresh() {
    }

}

export class SearchCollectionView extends helper.Views.CompositeView {
    datatable: any;
    constructor(options?) {
        options.itemView = SearchItemView;
        options.template = templateView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "#tblSearch tbody";
        this.events = {
            "click .jsSearch": "Search",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
    Search(e) {
        e.preventDefault();
        this.trigger("AdminSearchBooking");
    }

    //initialize() {
    //    alert('initialize..');
    //    $("#txtBookingDate").datepicker();
    //}

}

export class SearchItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            "mouseover .jsShowDetail": "ShowDetail",
            "click .jsShowDetail": "ShowDetail"
        };
        super(options);
    }
    ShowDetail() {
        //new userCtrl.UserCtrl().ShowDetail(this.model);
    }
}