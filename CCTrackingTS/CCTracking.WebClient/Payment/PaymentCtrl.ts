﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./PaymentTmpl.html"/>

var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./PaymentView");
import dto = require("CCTracking.WebClient/Dtos/PaymentDto");
import busVisitDto = require("CCTracking.WebClient/Dtos/BusVisitDto");
import DAL = require("../DAL/Payment");

var app;


export class PaymentCtrl extends helper.Controller {
    private paymentViewModel: views.PaymentViewModel;
    paymentView: views.PaymentView;
    busVisitCollection: any;
    backboneCollection: Backbone.Collection;
    busVisitCollectionView: views.BusVisitCollectionView;
    idCounter: number;
    constructor() {
        app = application.Application.getInstance();
        super();
        this.busVisitCollection = [
            //{ busVisitId: 1, centreId: 'center-b', busId: 'bus-b', driverId: 'driver-b' },
            //{ busVisitId: 2, centreId: 'center-c', busId: 'bus-c', driverId: 'driver-c' }
        ];
        //this.busVisitCollection.push({ busVisitId:3,  centreId: 'center-a', busId: 'bus-a', driverId: 'driver-a' });
        this.backboneCollection = new Backbone.Collection(this.busVisitCollection);
        this.busVisitCollectionView = new views.BusVisitCollectionView({ collection: this.backboneCollection });
        this.busVisitCollectionView.on("itemview:BusVisitRemoveItem", (currentView, busId, centreId, driverId) => this.RemoveBusVisitItem(busId, centreId, driverId));
        //this.paymentViewModel = new views.PaymentViewModel(new Backbone.Model(), this);
        this.idCounter = 1;
    }
    Show() {
        var url = window.location.href;
        //update payment
        if (url.indexOf("id=") > -1) {
            //alert(url.substring(url.indexOf("id=") + 3, url.length));
            var id = (url.substring(url.indexOf("id=") + 3, url.length));
            var deferred = DAL.GetById(id);
            deferred.done(p=> this.GetByIdCompleted(p));

        }
        //add payment
        else {
            this.LoadCompleted();
        }
    }

    //GetByIdCompleted(paymentResponse: dto.Models.PaymentResponse) {
    GetByIdCompleted(paymentResponse: any) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        var model = new Backbone.Model(paymentResponse["paymentModel"]);
        //booking id
        var url = window.location.href;
        var id = (url.substring(url.indexOf("id=") + 3, url.length));
        if (model.get("id") === undefined || model.get("id") === 0) {
            this.InitalizeKoBinding(model);
        }

        model.set("bookingId", id);
        //model.set("busList", lookupResponse.bus);
        //model.set("driverList", lookupResponse.driver);
        //model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        //model.set("paymentLocationList", lookupResponse.alkhidmatCentre);
        //model.set("paymentTypeList", lookupResponse.paymentType);
        //model.set("cashierList", lookupResponse.cashier);

        //model.set("busSelected", "");
        //model.set("driverSelected", "");
        //model.set("alkhidmatCentreSelected", "");


        //debugger;
        //var paymentLocation1 = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("paymentLocation") });
        //model.set("paymentLocationSelected1", paymentLocation1[0]);




        //var paymentType = _.filter(lookupResponse.paymentType, (p) => { return p.id == model.get("paymentType") });
        //model.set("paymentTypeSelected", paymentType[0]);

        //var cashier = _.filter(lookupResponse.cashier, (p) => { return p.id == model.get("officerId") });
        //model.set("cashierSelected", cashier[0]);

        this.layout = app.AppLayout;
        //this.paymentViewModel = new views.PaymentViewModel(model, this);
        //this.paymentView = new views.PaymentView({ viewModel: this.paymentViewModel });

        this.paymentView = new views.PaymentView(model);
        var vm = this.paymentView.viewModel;

        //vm.paymentTypeSelected(paymentType[0]);
        ////vm.paymentLocationSelected(paymentLocation[0]);
        //vm.cashierList(cashier[0]);
        //vm.amount(model.get("amount"));
        //vm.receiptNo(model.get("receiptNo"));
        //vm.easyPaisaTranNo(model.get("easyPaisaTranNo"));
        //vm.extraAmountCharge(model.get("extraAmountCharge"));
        //vm.extraAmountReason(model.get("extraAmountReason"));
        //vm.extraAmountReceipt(model.get("extraAmountReceipt"));
        //vm.paymentStatus(model.get("paymentStatus"));



        this.paymentView.on("BusVisitAddItem", (bookingId, alkhidmatCentre, driver, bus) => this.AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus));
        this.paymentView.on("PaymentSave", (bbmodel) => this.Save(bbmodel));

        this.backboneCollection = new Backbone.Collection(model.get("busVisits"));
        this.busVisitCollectionView = new views.BusVisitCollectionView({ collection: this.backboneCollection });
        this.busVisitCollectionView.on("itemview:BusVisitRemoveItem", (currentView, busId, centreId, driverId) => this.RemoveBusVisitItem(busId, centreId, driverId));

        app.MainRegion.show(this.paymentView);
        app.SubRegion.reset();
        app.SubRegion.show(this.busVisitCollectionView);
    }

    //BindWithVM(vm) {

    //    this.paymentView.viewModel.extraAmountReason("heheheheheh");
    //    this.paymentView.viewModel.paymentLocationList(paymentLocation[0]);

    //}


    InitalizeKoBinding(model) {
        model.set("amount", "");
        model.set("busChangeReason", "");
        model.set("receiptNo", "");
        model.set("easyPaisaTranNo", "");
        model.set("extraAmountCharge", "");
        model.set("extraAmountReason", "");
        model.set("extraAmountReceipt", "");
    }

    LoadCompleted() {

        this.layout = app.AppLayout;
        this.paymentView = new views.PaymentView();

        this.paymentView.on("BusVisitAddItem", (bookingId, alkhidmatCentre, driver, bus) => this.AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus));
        this.paymentView.on("PaymentSave", (bbmodel) => this.Save(bbmodel));
        app.MainRegion.show(this.paymentView);
        app.SubRegion.reset();
        app.SubRegion.show(this.busVisitCollectionView);
    }

    //LoadCompleted1() {
    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'))
    //    var model = new dto.Models.PaymentResponse();
    //    //var a = _.filter(lookupResponse.unionCouncil, (p)=> { return p.id==1});
    //    model.set("bookingId", "");
    //    model.set("paymentType", "");
    //    model.set("pricing", "");
    //    model.set("amount", "");
    //    model.set("paymentLocation", "");
    //    model.set("officerId", "");

    //    model.set("receiptNo","");
    //    model.set("extraAmountCharge", "");

    //    model.set("extraAmountReason", "");
    //    model.set("extraAmountReceipt", "");
    //    model.set("paymentStatus", "");
    //    //helper.SubscribeApplicationEventListener();

    //    model.set("busList", lookupResponse.bus);
    //    model.set("busSelected", "");
    //    model.set("driverList", lookupResponse.driver);
    //    model.set("driverSelected", "");
    //    model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
    //    model.set("alkhidmatCentreSelected", "");

    //    model.set("paymentLocationList", lookupResponse.alkhidmatCentre);
    //    model.set("paymentLocationSelected", "");
    //    model.set("cashierList", lookupResponse.cashier);
    //    model.set("cashierSelected", "");
    //    model.set("paymentTypeList", lookupResponse.paymentType);
    //    model.set("paymentTypeSelected", "");

    //    this.layout = app.AppLayout;
    //    this.paymentViewModel = new views.PaymentViewModel(model, this);
    //    this.paymentView = new views.PaymentView({ viewModel: this.paymentViewModel });        
    //    this.paymentView.on("BusVisitAddItem", (bookingId, alkhidmatCentre, driver, bus) => this.AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus));
    //    this.paymentView.on("PaymentSave", (bbmodel) => this.Save(bbmodel));
    //    app.MainRegion.show(this.paymentView);    
    //    app.SubRegion.reset();
    //    app.SubRegion.show(this.busVisitCollectionView);
    //}

    AddBusVisitItem(bookingId, alkhidmatCentre, driver, bus) {
        var counter = this.idCounter++;
        var busExist = this.backboneCollection.findWhere({ busId: bus.id });
        var driverExist = this.backboneCollection.findWhere({ driverId: driver.id });

        //var alreadyExist = this.backboneCollection.findWhere({ centreId: alkhidmatCentre.id, busId: bus.id, driverId: driver.id });
        //var alreadyExist = _.filter(this.backboneCollection, (item) => {
        //    debugger;
        //    return (item.busId == bus.id || item.driverId == driver.id);
        //});

        if (busExist == undefined && driverExist == undefined) {
            this.backboneCollection.push(new Backbone.Model({
                busVisitId: counter,
                centreId: alkhidmatCentre.id, centreDesc: alkhidmatCentre.description,
                busId: bus.id, busDesc: bus.description,
                driverId: driver.id, driverDesc: driver.description,
                visitTypeId: "2",
                isAvailableForBooking: false,
                isAvailableForFutureBooking: false,
                bookingId: bookingId
            }));
            this.busVisitCollectionView.collection = this.backboneCollection;
        }
        else {
            alert("Already exists!");
        }

    }
    RemoveBusVisitItem(busId, centreId, driverId) {
        this.backboneCollection.remove(this.backboneCollection.findWhere({ busId: busId, centreId: centreId, driverId: driverId }));
    }

    //GetAll() {
    //    var deferred = DAL.GetAll();
    //    deferred.done(p=> new views.PaymentView().GetAllCompleted(p));
    //}
    //Add(booking: dto.Models.BookingRequest) {
    Save(payment: any) {
        //reset actual id - match with DAL object's properties
        if (this.backboneCollection.length < 1) {
            alert("Please add bus details");
            return;
        }
        //payment.set("bus", payment.get("busSelected").id);
        //payment.set("driver", payment.get("driverSelected").id);
        //payment.set("alkhidmatCentre", payment.get("alkhidmatCentreSelected").id);
        //payment.set("paymentLocation", payment.get("paymentLocationSelected").id);
        //payment.set("officerId", payment.get("cashierSelected").id);
        //payment.set("paymentType", payment.get("paymentTypeSelected").id);
        
        payment.set("busVisits", this.backboneCollection.toJSON());
        var deferred = DAL.Save(payment);

        //TODO: call controller from here...
        deferred.done(p=> new views.PaymentView().SaveCompleted(p));
    }
}