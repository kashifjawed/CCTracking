/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./RefundBookingTmpl.html"/>

var _ = require('underscore');
import helper = require("../Helper");
var templateView = require("text!./RefundBookingTmpl.html");
import application = require("../App");
var app;

export class RefundBookingViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

export class RefundBookingView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = templateView;
        this.events = {
            "submit": "Save",
            "click .jsCancel": "Cancel"
        }
        super(options);       
    }
    Cancel() {        
        this.trigger("Event:CancelForm");
    }
    Save(e) {
        e.preventDefault();
        this.trigger("Event:SaveForm");
    }
}

