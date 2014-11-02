/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html"/>
/// <amd-dependency path="marionette"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html", "marionette"], function(require, exports, helper) {
    //var Marionette = require("marionette");
    var _ = require('underscore');

    var templateView = require("text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html");

    // View Model
    var BookingLeftViewModel = (function (_super) {
        __extends(BookingLeftViewModel, _super);
        function BookingLeftViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return BookingLeftViewModel;
    })(helper.ViewModel);
    exports.BookingLeftViewModel = BookingLeftViewModel;

    var BookingLeftView = (function (_super) {
        __extends(BookingLeftView, _super);
        function BookingLeftView(options) {
            this.template = templateView;
            this.events = {
                "click .jsTodayBooking": "ShowTodayBooking",
                "click .jsTotalBooking": "ShowTotalBooking",
                "click .jsPaidBooking": "ShowPaidBooking",
                "click .jsUnpaidBooking": "ShowUnpaidBooking"
            };
            _super.call(this, options);
            //this.listenTo(this, "TestEvent", () => this.TestFunction());
        }
        BookingLeftView.prototype.ShowTotalBooking = function (e) {
            // new bookingCtrl.BookingCtrl().GetAll(1);
            e.preventDefault();
            this.trigger("ShowTotalBooking");
        };

        BookingLeftView.prototype.ShowPaidBooking = function (e) {
            //new bookingCtrl.BookingCtrl().GetAll(2);
            e.preventDefault();
            this.trigger("ShowPaidBooking");
        };

        BookingLeftView.prototype.ShowUnpaidBooking = function (e) {
            // new bookingCtrl.BookingCtrl().GetAll(3);
            e.preventDefault();
            this.trigger("ShowUnpaidBooking");
        };
        BookingLeftView.prototype.ShowTodayBooking = function (e) {
            // new bookingCtrl.BookingCtrl().GetAll(4);
            e.preventDefault();
            this.trigger("ShowTodayBooking");
        };
        return BookingLeftView;
    })(helper.Views.MvvmView);
    exports.BookingLeftView = BookingLeftView;
});
//# sourceMappingURL=BookingLeftView.js.map
