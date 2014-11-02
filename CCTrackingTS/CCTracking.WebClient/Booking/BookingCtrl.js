/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./BookingView", "CCTracking.WebClient/Dtos/BookingDto", "../DAL/Booking", "marionette", "jquery", "knockout", "text!./BookingTmpl.html"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BookingTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");

    var app;

    var BookingCtrl = (function (_super) {
        __extends(BookingCtrl, _super);
        function BookingCtrl() {
            app = application.Application.getInstance();
            _super.call(this);
        }
        BookingCtrl.prototype.Show = function () {
            //TODO: model fill from server..
            //if localStorage is empty then call from db
            //var a = localStorage.getItem('lookupResponse');
            var _this = this;
            var url = window.location.href;

            //update booking
            if (url.indexOf("id=") > -1) {
                //alert(url.substring(url.indexOf("id=") + 3, url.length));
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.LoadCompleted(JSON.parse(localStorage.getItem('lookupResponse')));
            }
        };

        BookingCtrl.prototype.GetByIdCompleted = function (bookingResponse) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            var model = new Backbone.Model(bookingResponse["bookingModel"]);

            model.set("causeOfDeathList", lookupResponse.causeOfDeath);
            model.set("landmarkList", lookupResponse.landmark);
            model.set("busPointList", lookupResponse.landmark);
            model.set("unionCouncilList", lookupResponse.unionCouncil);
            model.set("townList", lookupResponse.town);
            model.set("graveyardList", lookupResponse.graveyard);
            model.set("busDetailsList", lookupResponse.bus);
            model.set("pickupTimeSlotList", lookupResponse.timeSlot);
            model.set("returnTimeSlotList", lookupResponse.timeSlot);
            model.set("prayersList", lookupResponse.prayers);

            var causeOfDeath = _.filter(lookupResponse.causeOfDeath, function (p) {
                return p.id == model.get("causeOfDeath");
            });
            var landmark = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("landmarkId");
            });
            var busPoint = _.filter(lookupResponse.landmark, function (p) {
                return p.id == model.get("busPoint");
            });
            var unionCouncil = _.filter(lookupResponse.unionCouncil, function (p) {
                return p.id == model.get("unionCouncilId");
            });
            var town = _.filter(lookupResponse.town, function (p) {
                return p.id == model.get("townId");
            });
            var graveyard = _.filter(lookupResponse.graveyard, function (p) {
                return p.id == model.get("graveyardId");
            });
            var busDetail = _.filter(lookupResponse.bus, function (p) {
                return p.id == model.get("busDetailId");
            });

            var pickupTime = _.filter(lookupResponse.timeSlot, function (p) {
                return p.id == model.get("pickupTime");
            });
            var returnTime = _.filter(lookupResponse.timeSlot, function (p) {
                return p.id == model.get("returnTime");
            });
            var prayer = _.filter(lookupResponse.prayers, function (p) {
                return p.id == model.get("namazEJanazaHeldIn");
            });

            model.set("causeOfDeathSelected", causeOfDeath[0]); //model.get("causeOfDeath")

            //model.set("landmarkIdSelected", landmark[0]);
            model.set("busPointSelected", busPoint[0]);
            model.set("unionCouncilIdSelected", unionCouncil[0]);
            model.set("townIdSelected", town[0]);
            model.set("graveyardIdSelected", graveyard[0]);
            model.set("busDetailIdSelected", busDetail[0]);
            model.set("deseasedGender", model.get("deseasedGender").toString());

            model.set("pickupTimeSlotSelected", pickupTime[0]);
            model.set("returnTimeSlotSelected", returnTime[0]);
            model.set("prayersSelected", prayer[0]);

            model.set("pickupDate", helper.FormatDateString(model.get("pickupDate")));
            this.bookingViewModel = new views.BookingViewModel(model, this);
            this.bookingView = new views.BookingView({ viewModel: this.bookingViewModel });
            this.layout = app.AppLayout;
            app.MainRegion.show(this.bookingView);
        };
        BookingCtrl.prototype.LoadCompleted = function (lookupResponse) {
            var model = new dto.Models.BookingResponse();

            model.set("contactName", "");
            model.set("contactMobile", "");
            model.set("contactNic", "");
            model.set("deseasedName", "");
            model.set("deseasedAge", "");
            model.set("deseasedGender", "");

            model.set("causeOfDeathList", lookupResponse.causeOfDeath);
            model.set("causeOfDeathSelected", "");

            model.set("address", "");
            model.set("landmarkIdSelected", "");
            model.set("landmarkList", lookupResponse.landmark);
            model.set("busPointList", lookupResponse.landmark);
            model.set("busPointSelected", "");

            model.set("unionCouncilList", lookupResponse.unionCouncil);
            model.set("unionCouncilIdSelected", "");
            model.set("townList", lookupResponse.town);
            model.set("townIdSelected", "");
            model.set("pickupDate", "");
            model.set("pickupTime", "");
            model.set("returnTime", "");
            model.set("graveyardList", lookupResponse.graveyard);
            model.set("graveyardIdSelected", "");

            model.set("pickupTimeSlotList", lookupResponse.timeSlot);
            model.set("pickupTimeSlotSelected", "");
            model.set("returnTimeSlotList", lookupResponse.timeSlot);
            model.set("returnTimeSlotSelected", "");
            model.set("prayersList", lookupResponse.prayers);
            model.set("prayersSelected", "");

            model.set("namazEJanazaHeldIn", "");
            model.set("namazEJanazaLocation", "");
            model.set("masjidName", "");
            model.set("otherDetail", "");

            //model.set("busDetailsList", lookupResponse.bus);
            //model.set("busDetailIdSelected", "");
            //model.set("initialReading", "");
            //model.set("finalReading", "");
            //model.set("distanceConvered", "");
            //var c = ko.computed(function () {
            //    alert(model.get("address"));
            //});
            this.bookingViewModel = new views.BookingViewModel(model, this);
            this.bookingView = new views.BookingView({ viewModel: this.bookingViewModel });
            this.layout = app.AppLayout;
            app.MainRegion.show(this.bookingView);
        };

        BookingCtrl.prototype.GetAll = function (bookingFilterType) {
            if (typeof bookingFilterType === "undefined") { bookingFilterType = 1; }
            if (bookingFilterType == undefined)
                bookingFilterType = 1; //  allbooking
            var deferred = DAL.GetAll(bookingFilterType);
            deferred.done(function (p) {
                return new views.BookingView().GetAllCompleted(p);
            });
        };

        //Add(booking: dto.Models.BookingRequest) {
        BookingCtrl.prototype.Save = function (booking) {
            var _this = this;
            var appObj = app.request("AppGlobalSetting");
            booking.set("modifiedBy", appObj.get("Id"));

            //reset actual id - match with DAL object's properties
            booking.set("causeOfDeath", booking.get("causeOfDeathSelected").id);

            //booking.set("landmarkId", booking.get("landmarkIdSelected").id);
            booking.set("busPoint", booking.get("busPointSelected").id);
            booking.set("unionCouncilId", booking.get("unionCouncilIdSelected").id);
            booking.set("townId", booking.get("townIdSelected").id);
            booking.set("graveyardId", booking.get("graveyardIdSelected").id);

            booking.set("pickupTime", booking.get("pickupTimeSlotSelected").id);
            booking.set("returnTime", booking.get("returnTimeSlotSelected").id);
            booking.set("namazEJanazaHeldIn", booking.get("prayersSelected").id);

            //booking.set("busDetailId", booking.get("busDetailIdSelected").id);
            var deferred = DAL.Save(booking);

            //TODO: call controller from here...
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        BookingCtrl.prototype.SaveCompleted = function (bookingResponse) {
            var result = new Backbone.Model(bookingResponse);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Booking", "Due to some technical reason booking have not been saved successfully!<br> Pelase try later");
            } else {
                helper.ShowModalPopup("success", "Booking", "Record has been saved successfully with Booking ID : " + bookingResponse["id"]);
                location.href = "#payment?id=" + result.get("id");
            }
        };
        return BookingCtrl;
    })(helper.Controller);
    exports.BookingCtrl = BookingCtrl;
});
