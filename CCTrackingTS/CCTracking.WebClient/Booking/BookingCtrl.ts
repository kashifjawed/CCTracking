/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BookingTmpl.html"/>

var _ = require("underscore");
var ko = require("knockout");
import application = require("../App");
import helper = require("../Helper");
import views = require("./BookingView");
import dto = require("CCTracking.WebClient/Dtos/BookingDto");
import DAL = require("../DAL/Booking");

var app;


export class BookingCtrl extends helper.Controller {
    private bookingViewModel: views.BookingViewModel;
    bookingView: views.BookingView;
    constructor() {
        app = application.Application.getInstance();
        super();
    }
    Show() {
        //TODO: model fill from server..        
        //if localStorage is empty then call from db        
        //var a = localStorage.getItem('lookupResponse');
        
        var url = window.location.href;
        //update booking
        if (url.indexOf("id=") > -1) {
            //alert(url.substring(url.indexOf("id=") + 3, url.length));
            var id = (url.substring(url.indexOf("id=") + 3, url.length));
            var deferredById = DAL.GetById(id);
            deferredById.done(p=> this.GetByIdCompleted(p));

        }
        //add booking
        else {
            this.LoadCompleted(JSON.parse(localStorage.getItem('lookupResponse')));
        }
    }

    GetByIdCompleted(bookingResponse: dto.Models.BookingResponse) {
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



        var causeOfDeath = _.filter(lookupResponse.causeOfDeath, (p) => { return p.id == model.get("causeOfDeath") });
        var landmark = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("landmarkId") });
        var busPoint = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("busPoint") });
        var unionCouncil = _.filter(lookupResponse.unionCouncil, (p) => { return p.id == model.get("unionCouncilId") });
        var town = _.filter(lookupResponse.town, (p) => { return p.id == model.get("townId") });
        var graveyard = _.filter(lookupResponse.graveyard, (p) => { return p.id == model.get("graveyardId") });
        var busDetail = _.filter(lookupResponse.bus, (p) => { return p.id == model.get("busDetailId") });

        var pickupTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("pickupTime") });
        var returnTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("returnTime") });
        var prayer = _.filter(lookupResponse.prayers, (p) => { return p.id == model.get("namazEJanazaHeldIn") });

        model.set("causeOfDeathSelected", causeOfDeath[0]);//model.get("causeOfDeath")
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

    }
    LoadCompleted(lookupResponse) {
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

    }

    GetAll(bookingFilterType= 1) {
        if (bookingFilterType == undefined)
            bookingFilterType = 1; //  allbooking
        var deferred = DAL.GetAll(bookingFilterType);
        deferred.done(p=> new views.BookingView().GetAllCompleted(p));
    }

    //Add(booking: dto.Models.BookingRequest) {
    Save(booking: any) {
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
        deferred.done(p=> this.SaveCompleted(p));
    }

    SaveCompleted(bookingResponse: any) {
        var result = new Backbone.Model(bookingResponse);
        if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
            helper.ShowModalPopup("danger", "Booking", "Due to some technical reason booking have not been saved successfully!<br> Pelase try later");
        }
        else {
            helper.ShowModalPopup("success", "Booking", "Record has been saved successfully with Booking ID : " + bookingResponse["id"]);
            location.href = "#payment?id=" + result.get("id");
        }
    }
}