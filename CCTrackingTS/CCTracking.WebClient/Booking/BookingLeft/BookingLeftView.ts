/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html"/>
/// <amd-dependency path="marionette"/>

//var Marionette = require("marionette");

var _ = require('underscore');
import helper = require("../../Helper");
var templateView = require("text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html");


// View Model
export class BookingLeftViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

export class BookingLeftView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = templateView;
        this.events = {
            "click .jsTodayBooking": "ShowTodayBooking",
            "click .jsTotalBooking": "ShowTotalBooking",
            "click .jsPaidBooking": "ShowPaidBooking",
            "click .jsUnpaidBooking": "ShowUnpaidBooking",
        }
        super(options);
        //this.listenTo(this, "TestEvent", () => this.TestFunction());
    }

    ShowTotalBooking(e) {
       // new bookingCtrl.BookingCtrl().GetAll(1);
        e.preventDefault();
        this.trigger("ShowTotalBooking");
    }

    ShowPaidBooking(e) {
        //new bookingCtrl.BookingCtrl().GetAll(2);
        e.preventDefault();
        this.trigger("ShowPaidBooking");
    }

    ShowUnpaidBooking(e) {
       // new bookingCtrl.BookingCtrl().GetAll(3);
        e.preventDefault();
        this.trigger("ShowUnpaidBooking");
    }
    ShowTodayBooking(e) {
       // new bookingCtrl.BookingCtrl().GetAll(4);
        e.preventDefault();
        this.trigger("ShowTodayBooking");
    }
}

