/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./KoBindingTmpl.html"/>

var _ = require('underscore');
import helper = require("../Helper");
var ko = require("knockout");
var kb = require("knockback");
//import bookingDto = require("CCTracking.WebClient/Dtos/BookingDto");
import koBindingCtrl = require("./KoBindingCtrl");

var templateView = require("text!./KoBindingTmpl.html");
//var templateGrid = require("text!./PaymentGrid.html");

import application = require("../App");
var app;

//export class KoBindingViewModel extends helper.ViewModel {
//    constructor(model: any, controller: any) {
//        super(model, controller);
//    }
//}

export class KoBindingView extends helper.Views.ItemView {
    viewModel: ViewModell;
    bbModel:Backbone.Model;
    constructor(options) {
        app = application.Application.getInstance();
        this.template = templateView;
        this.viewModel = new ViewModell();
        this.bbModel = new Backbone.Model();
        //this.bbModel = kb.viewModel(new Backbone.Model(this.viewModel));
        this.events = {
            "submit": "Save",
            "click .jsCancel": "Cancel"
        }  
        super(options);
    }

    Save(e) {
        e.preventDefault();
        debugger;
        var a = this.viewModel.one();
        
        //this.bbModel = new Backbone.Model(this.viewModel);
        //var b = this.bbModel.get("one")();
        this.bbModel.set("one", this.viewModel.one());
        this.bbModel.set("two", this.viewModel.two());
        this.bbModel.set("sum", this.viewModel.sum());
        var b = this.bbModel;
    }

    onShow() {
        ko.applyBindings(this.viewModel, this.el);
    }
}

export class ViewModell {
    //model: Backbone.Model;
    one: any;
    two: any;
    sum:any;
    //one: KnockoutObservable<string>;
    //two: KnockoutObservable<string>;
    //sum: KnockoutComputed<string>;

    constructor() {
        this.one = ko.observable();
        this.two = ko.observable();
        this.sum = ko.computed({
            owner: this,
            read: () => {
                if (this.one() != undefined && this.two() != undefined) {
                    return (parseInt(this.one()) + parseInt(this.two()));
                } else {
                    return;    
                }
                
            }
        });
        //this.model = new Backbone.Model({});
    }
}
