/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html"/>
/// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/ModalPopup.html"/>
/// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/Progressbar.html"/>
/// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/BusDetailModalPopup.html"/>
/// <amd-dependency path="marionette"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html", "text!CCTracking.WebClient/Common/Templates/ModalPopup.html", "text!CCTracking.WebClient/Common/Templates/Progressbar.html", "text!CCTracking.WebClient/Common/Templates/BusDetailModalPopup.html", "marionette"], function(require, exports, APP, helper) {
    var _ = require('underscore');

    var templateView = require("text!CCTracking.WebClient/Booking/BookingLeft/BookingLeftTmpl.html");
    var popupView = require("text!CCTracking.WebClient/Common/Templates/ModalPopup.html");
    var pbarView = require("text!CCTracking.WebClient/Common/Templates/Progressbar.html");
    var busDeatilView = require("text!CCTracking.WebClient/Common/Templates/BusDetailModalPopup.html");

    var app;

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
            app = APP.Application.getInstance();
            this.events = {
                "click .jsTodayBooking": "ShowTodayBooking",
                "click .jsTotalBooking": "ShowTotalBooking",
                "click .jsPaidBooking": "ShowPaidBooking",
                "click .jsUnpaidBooking": "ShowUnpaidBooking"
            };

            //app.vent.on("Event:UpdateSummary", () => {
            //    alert("updated...");
            //});
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

    var ModalPopupView = (function (_super) {
        __extends(ModalPopupView, _super);
        function ModalPopupView(options) {
            //debugger;
            //var modalPopupView = require("text!./Common/Templates/ModalPopup.html");
            this.template = popupView.getOuterHTML("#Modal");
            _super.call(this, options);
            //this.model = options.model;
        }
        return ModalPopupView;
    })(helper.Views.ItemView);
    exports.ModalPopupView = ModalPopupView;

    var ProgressbarView = (function (_super) {
        __extends(ProgressbarView, _super);
        function ProgressbarView(options) {
            //var progressBarView = require("text!./Common/Templates/Progressbar.html");
            this.template = pbarView.getOuterHTML("#Progressbar");
            _super.call(this, options);
            //this.model = options.model;
        }
        return ProgressbarView;
    })(helper.Views.ItemView);
    exports.ProgressbarView = ProgressbarView;

    var BusDetailModalPopupCollectionView = (function (_super) {
        __extends(BusDetailModalPopupCollectionView, _super);
        function BusDetailModalPopupCollectionView(options) {
            this.itemView = BusDetailModalPopupView;

            //var girdTemplate = busDeatilView
            this.template = busDeatilView.getOuterHTML("#ModalGrid");
            this.itemViewContainer = "#ItemContainer";
            _super.call(this, options);
        }
        return BusDetailModalPopupCollectionView;
    })(helper.Views.CompositeView);
    exports.BusDetailModalPopupCollectionView = BusDetailModalPopupCollectionView;

    var BusDetailModalPopupView = (function (_super) {
        __extends(BusDetailModalPopupView, _super);
        function BusDetailModalPopupView(options) {
            //var modalPopupView = require("text!./Common/Templates/BusDetailModalPopup.html");
            this.template = busDeatilView.getOuterHTML("#Modal");
            this.tagName = "table";
            _super.call(this, options);
            //this.model = options.model;
        }
        return BusDetailModalPopupView;
    })(helper.Views.ItemView);
    exports.BusDetailModalPopupView = BusDetailModalPopupView;
});
