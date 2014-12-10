/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BookingLeftTmpl.html"/>



var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../../App");
import helper = require("../../Helper");
import views = require("./BookingLeftView");
import dto = require("../../Dtos/BookingLeftDto");
import DAL = require("../../DAL/BookingLeft");


import bookingCtrl = require("../BookingCtrl");

export class BookingLeftCtrl extends helper.Controller {
    app: any;
    bookingLeftViewModel: views.BookingLeftViewModel;
    bookingLeftView: views.BookingLeftView;
    backboneModel: Backbone.Model;
    //collection: dto.Models.BookingLeftCollection;
    //collectionView: views.BookingLeftCollectionView;

    constructor() {
        super();
        
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.BookingLeftDto();
        this.bookingLeftViewModel = new views.BookingLeftViewModel(this.backboneModel, this);
        this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel });
              
       // this.collection = new dto.Models.BookingLeftCollection({});
        //this.collectionView = new views.BookingLeftCollectionView({ collection: this.collection });

    }

    Show() {
       // debugger;
       var appObj = this.app.request("AppGlobalSetting");
       var model = new dto.Models.BookingLeftDto();
       model.set("officerId", appObj.get("Id"));
       var deferredById = DAL.GetByCriteria(model);
            deferredById.done(p=> this.GetByCriteriaCompleted(p));      
    }
       
    GetByCriteriaCompleted(bookingLeftDto: dto.Models.BookingLeftDto) {
        //alert("GetByIdCompleted..");
        this.backboneModel = new Backbone.Model(bookingLeftDto["bookingLeftModel"]);
        var model = this.backboneModel;

        this.UIBinding(model);
        //this.bookingLeftView.viewModel = this.bookingLeftViewModel;
        this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel});

        this.bookingLeftView.on("ShowTotalBooking", () => this.ShowTotalBooking());
        this.bookingLeftView.on("ShowPaidBooking", () => this.ShowPaidBooking());
        this.bookingLeftView.on("ShowUnpaidBooking", () => this.ShowUnpaidBooking());
        this.bookingLeftView.on("ShowTodayBooking", () => this.ShowTodayBooking());
        //app = application.Application.getInstance();
        this.app.LeftRegion.show(this.bookingLeftView);

        //this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel });
    }

    ShowTotalBooking() {
        new bookingCtrl.BookingCtrl().GetAll(1);
    }

    ShowPaidBooking() {
        new bookingCtrl.BookingCtrl().GetAll(2);
    }

    ShowUnpaidBooking() {
        new bookingCtrl.BookingCtrl().GetAll(3);
    }
    ShowTodayBooking() {
        new bookingCtrl.BookingCtrl().GetAll(4);
    }

    UIBinding(model: any) {       
        this.bookingLeftViewModel.bbModel = model;
        this.bookingLeftViewModel.model = kb.viewModel(model);
        ko.cleanNode($(this.bookingLeftView.el)[0]);
        ko.applyBindings(this.bookingLeftViewModel, this.bookingLeftView.el);
    }
}
