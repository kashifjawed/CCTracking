/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./UserTmpl.html"/>
/// <amd-dependency path="text!./UserGrid.html"/>

var _ = require('underscore');
import helper = require("../Helper");
var templateView = require("text!./UserTmpl.html");
var templateGrid = require("text!./UserGrid.html");

import application = require("../App");
var app;

// View Model
export class UserViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
export class UserView extends helper.Views.MvvmView {
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
        //this.off("SaveUser");
    }
    Cancel() {
        this.trigger("CancelForm");
    }
    TestFunction() {
        alert("test function");
    }
    Save(e) {
        e.preventDefault();
        this.trigger("SaveUser");
    }
}

export class UserCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = UserItemView;
        options.template = templateGrid.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "tbody";
        super(options);
    }
}

export class UserItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateGrid.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            "click .jsShowDetail": "ShowDetail",
            "click .jsResetPassword": "ResetPassword"
        };
        super(options);
    }
    ShowDetail() {
        this.trigger("ShowDetail");
    }

    ResetPassword(e) {
        var userId = helper.GetParameterByName("id", e.target.href);//.split("=")[1];
        var userName = helper.GetParameterByName("username", e.target.href);
        var model = new Backbone.Model( {id : userId,  userName :  userName });
        this.trigger("Event:ResetPassword", model);
    }
}

