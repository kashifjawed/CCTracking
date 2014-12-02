/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>

var _ = require("underscore");
var ko = require("knockout");
var kb = require("knockback");
import application = require("../App");
import helper = require("../Helper");
import views = require("./BusAvailabilityView");
import dto = require("../Dtos/BusAvailabilityDto");
import DAL = require("../DAL/BusAvailability");

export class BusAvailabilityCtrl extends helper.Controller {
    app: any;
    viewModel: views.BusAvailabilityViewModel;
    view: views.BusAvailabilityView;
    backboneModel: Backbone.Model;
    collection: dto.Models.BusAvailabilityCollection;
    collectionView: views.BusAvailabilityCollectionView;
    compositeModel: Backbone.Model;

    constructor() {
        super();
        //alert("constructor");
        this.app = application.Application.getInstance();
        this.backboneModel = new dto.Models.BusAvailabilityDto();
        this.viewModel = new views.BusAvailabilityViewModel(this.backboneModel, this);
        this.view = new views.BusAvailabilityView({ viewModel: this.viewModel });
        this.collection = new dto.Models.BusAvailabilityCollection({ id: "", busList: "",centreName:"" });
        this.collectionView = new views.BusAvailabilityCollectionView({ collection: this.collection });
        this.compositeModel = new Backbone.Model();
    }

    Show() {
        //alert('inside show method');
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        var model = this.backboneModel;
        model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
        model.set("alkhidmatCentreSelected", "");
        model.set("busList", lookupResponse.bus);
        model.set("busSelected", "");
        this.viewModel = new views.BusAvailabilityViewModel(model, this);
        this.view = new views.BusAvailabilityView({ viewModel: this.viewModel });
        this.view.model = model;
        this.view.listenTo(this.view, "Event:BusAvailability", (centreId) => this.BusAvailability(centreId));
        this.collectionView.listenTo(this.collectionView, "itemview:Event:BusBookingDetail", (view,busId) => this.ShowBusBookingDetail(busId));
        //this.collectionView.on("itemview:Event:BusBookingDetail", (nearestCentreModel) => this.ShowBusBookingDetail(nearestCentreModel));

        
        this.app.RightRegion.show(this.view);
        this.app.SubRegion.show(this.collectionView);
    }
    ShowBusBookingDetail(busId:number) {
        var deferred = DAL.GetById(busId);
        deferred.done(p => this.ShowBusBookingDetailCompleted(p));
    }

    ShowBusBookingDetailCompleted(model) {
        var busDetailCollection = new Backbone.Collection(model["nearestCentreList"]);
        var busDetail = new Backbone.Model();
        busDetail.set("type", "btn-warning");
        //busDetail.set("title", "BUS DETAIL");
        busDetail.set("message", "");
        //busDetail.set("message", "On Booking - Expected Retrun Time is : " + busDetail.get("outTime") + " - " + busDetail.get("returnTime"));
        helper.ShowBusDetailModalPopup(busDetail, busDetailCollection);
    }

    BusAvailability(centreId: number) {
        //alert(centreId);
        var deferred = DAL.GetAll(centreId);
        deferred.done(p => this.GetAllCompleted(p));
    }

    GetAllCompleted(dto: dto.Models.BusAvailabilityDto) {
        
        this.collection.reset(dto["nearestCentreList"]);
        this.collectionView.collection = this.collection;
        //this.app.SubRegion.show(this.collectionView);
    }

    //SimpleLoad() {
    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
    //    this.compositeModel.set("busList", lookupResponse.bus);
    //    this.compositeModel.set("busSelected", "");
    //    this.collectionView.model = this.compositeModel;
    //    //this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
    //    this.collectionView.listenTo(this.collectionView, "Event:SearchVisit", (busId) => this.SearchVisit(busId));
    //    this.app.MainRegion.show(this.collectionView);

    //    var vm = kb.viewModel(this.compositeModel);
    //    var element = $('#ddlBusDetails')[0];
    //    ko.cleanNode(element);
    //    ko.applyBindings(vm, element);
    //}

    //Load() {

    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
    //    //var model = new dto.Models.StationDto();
    //    var model = this.backboneModel;
    //    this.viewModel.bbModel = model;
    //    this.viewModel.model = kb.viewModel(model);

    //    model.set("outTimeSlotList", lookupResponse.timeSlot);
    //    model.set("outTimeSlotSelected", "");
    //    model.set("reutrnTimeSlotList", lookupResponse.timeSlot);
    //    model.set("returnTimeSlotSelected", "");

    //    model.set("busList", lookupResponse.bus);
    //    model.set("busSelected", "");
    //    model.set("driverList", lookupResponse.driver);
    //    model.set("driverSelected", "");
    //    model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
    //    model.set("alkhidmatCentreSelected", "");
    //    model.set("visitTypeList", lookupResponse.visitType);
    //    model.set("visitTypeSelected", "");




    //    model.set("centreId", "");
    //    model.set("busId", "");
    //    model.set("driverId", "");
    //    model.set("visitTypeId", lookupResponse.landmark);
    //    model.set("bookingId", "");
    //    model.set("inchargeName", "");
    //    model.set("visitDate", "");
    //    model.set("readingWhenFilling", "");
    //    model.set("pumpLocation", "");
    //    model.set("fuelRate", "");
    //    model.set("fuelAmount", "");
    //    model.set("isBookingCompleted", "");
    //    model.set("description", "");
    //    model.set("initialReading", "");
    //    model.set("finalReading", "");
    //    model.set("isActive", "");
    //    model.set("modifiedBy", "");


    //    this.viewModel = new views.BusVisitViewModel(model, this);
    //    this.view = new views.BusVisitView({ viewModel: this.viewModel });
    //    this.view.on("Event:SaveForm", () => this.Save(this.viewModel.bbModel));
    //    this.view.on("Event:CancelForm", () => this.Cancel());
    //    this.app.MainRegion.show(this.view);

    //}

    //GetAll() {

    //    var deferred = DAL.GetAll(-1);
    //    deferred.done(p=> this.GetAllCompleted1(p));
    //}

    //GetByIdCompleted(dto: dto.Models.BusVisitDto) {
    //    //alert("GetByIdCompleted..");
    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
    //    this.backboneModel = new Backbone.Model(dto["busVisitModel"]);
    //    var model = this.backboneModel;

    //    model.set("outTimeSlotList", lookupResponse.timeSlot);
    //    var outTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("outTime"); });
    //    model.set("outTimeSlotSelected", outTime[0]);

    //    model.set("reutrnTimeSlotList", lookupResponse.timeSlot);
    //    var inTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("returnTime"); });
    //    model.set("returnTimeSlotSelected", inTime[0]);

    //    model.set("busList", lookupResponse.bus);
    //    var bus = _.filter(lookupResponse.bus, (p) => { return p.id == model.get("busId"); });
    //    model.set("busSelected", bus[0]);

    //    model.set("driverList", lookupResponse.driver);
    //    var driver = _.filter(lookupResponse.driver, (p) => { return p.id == model.get("driverId"); });
    //    model.set("driverSelected", driver[0]);

    //    model.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
    //    var centre = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("centreId"); });
    //    model.set("alkhidmatCentreSelected", centre[0]);

    //    model.set("visitTypeList", lookupResponse.visitType);
    //    var visitType = _.filter(lookupResponse.visitType, (p) => { return p.id == model.get("visitTypeId"); });
    //    model.set("visitTypeSelected", visitType[0]);


    //    this.viewModel = new views.BusVisitViewModel(model, this);
    //    this.view = new views.BusVisitView({ viewModel: this.viewModel });
    //    this.view.on("Event:SaveForm", () => this.Save(this.viewModel.bbModel));
    //    this.view.on("Event:CancelForm", () => this.Cancel());
    //    //this.UIBinding(model);
    //    this.app.MainRegion.show(this.view);
    //}

    //Save(model: any) {
    //    var appObj = this.app.request("AppGlobalSetting");
    //    model.set("modifiedBy", appObj.get("Id"));
    //    model.set("centreId", model.get("alkhidmatCentreSelected").id);
    //    model.set("driverId", model.get("driverSelected").id);
    //    model.set("busId", model.get("busSelected").id);
    //    model.set("outTime", model.get("outTimeSlotSelected").id);
    //    model.set("returnTime", model.get("returnTimeSlotSelected").id);
    //    model.set("visitTypeId", model.get("visitTypeSelected").id);


    //    model.set("isActive", model.get("isActive") == "1" ? true : false);
    //    var deferred = DAL.Save(model);
    //    deferred.done(p=> this.SaveCompleted(p));
    //}

    //GetAllCompleted(model: dto.Models.BusVisitDto) {
    //    this.collection.reset(model["busVisitList"]);
    //}

    //GetAllCompleted1(model: dto.Models.BusVisitDto) {
    //    this.compositeModel = new Backbone.Model();
    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
    //    this.compositeModel.set("busList", lookupResponse.bus);
    //    this.compositeModel.set("busSelected", "");
    //    this.collection = new Backbone.Collection(model["busVisitList"]);

    //    this.collectionView = new views.BusVisitCollectionView({ collection: this.collection, model: this.compositeModel });
    //    this.collectionView.on("itemview:ShowDetail", (view) => this.GetByIdCompleted(view.model));
    //    this.collectionView.listenTo(this.collectionView, "Event:SearchVisit", (busId) => this.SearchVisit(busId));
    //    this.app.MainRegion.show(this.collectionView);

    //    var vm = kb.viewModel(this.compositeModel);
    //    var element = $('#ddlBusDetails')[0];
    //    ko.cleanNode(element);
    //    ko.applyBindings(vm, element);
    //}

    //SearchVisit(busId) {
    //    var deferred = DAL.GetAll(busId);
    //    deferred.done(p=> this.GetAllCompleted(p));
    //}

    //SaveCompleted(dto: dto.Models.BusVisitDto) {
    //    this.backboneModel = new Backbone.Model(dto);
    //    var model = this.backboneModel;
    //    //console.log(loginResponse);        
    //    if (dto == undefined) {
    //        helper.ShowModalPopup("danger", "Bus Visit", "Bus visit have not been saved successfully!");
    //    }
    //    else {
    //        helper.ShowModalPopup("success", "Bus Visit", "Record has been saved successfully with Bus Visit ID : " + dto["id"]);
    //        //this.UIBinding(model);
    //        this.Cancel();
    //    }
    //}

    //Cancel() {
    //    window.location.href = "#viewBusVisit";
    //}

    //UIBinding(model: any) {
    //    var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
    //    model.set("landmarkList", lookupResponse.landmark);
    //    var landmark = _.filter(lookupResponse.landmark, (p) => { return p.id == model.get("landmarkId"); });
    //    model.set("landmarkIdSelected", landmark[0]);



    //    this.viewModel.bbModel = model;

    //}

}
