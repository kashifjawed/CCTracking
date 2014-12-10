/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./Home.html"/>

var _ = require('underscore');
import helper = require("../Helper");
import homeCtrl = require("./HomeCtrl");
var templateView = require("text!./Home.html");
import application = require("../App");
var app;

export class HomeItemView extends helper.Views.ItemView {
    //viewModel: ViewModel;
    //bbModel: Backbone.Model;
    constructor(options?) {
        this.template = templateView;
        //this.viewModel = new ViewModel(options);
        //this.bbModel = new Backbone.Model();
        this.events = {
            "submit": "Save",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
}