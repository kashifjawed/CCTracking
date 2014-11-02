/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusMilageGrid.html"/>

var _ = require('underscore');
var ko = require("knockout");
import helper = require("../../Helper");
var templateView = require("text!./BusMilageGrid.html");
import application = require("../../App");
var app;

// View Model
export class BusMilageViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
//export class BusMilageView extends helper.Views.ItemView {
//    viewModel: ViewModel;
//    bbModel: Backbone.Model;
//    constructor(options?) {
//        this.template = templateView;
//        this.viewModel = new ViewModel(options);
//        this.bbModel = new Backbone.Model();

//        super(options);
//    }

//    Cancel() {
//        this.trigger("Event:CancelForm");
//    }
//    onShow() {
//        ko.applyBindings(this.viewModel, this.el);
//    }
//}

export class ViewModel {
    id: any;
    centreId: any;
    busId: any;
    driverId: any;
    visitTypeId: any;
    bookingId: any;
    inchargeName: any;
    visitDate: any;
    outTime: any;
    returnTime: any;
    readingWhenFilling: any;
    pumpLocation: any;
    fuelRate: any;
    fuelAmount: any;
    isBookingCompleted: any;
    description: any;
    initialReading: any;
    finalReading: any;
    isActive: any;
    busDesc: any;
    centreDesc: any;
    driverDesc: any;
    visitTypeDesc: any;
    isPatrolPump: any;
    isBooking: any;

    outTimeSlotList: any;
    reutrnTimeSlotList: any;
    busList: any;
    driverList: any;
    alkhidmatCentreList: any;
    visitTypeList: any;
    outTimeSlotSelected: any;
    returnTimeSlotSelected: any;
    busSelected: any;
    driverSelected: any;
    alkhidmatCentreSelected: any;
    visitTypeSelected: any;



    constructor(model) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        this.outTimeSlotList = ko.observableArray(lookupResponse.timeSlot);
        this.reutrnTimeSlotList = ko.observableArray(lookupResponse.timeSlot);
        this.busList = ko.observableArray(lookupResponse.bus);
        this.driverList = ko.observableArray(lookupResponse.driver);
        this.alkhidmatCentreList = ko.observableArray(lookupResponse.alkhidmatCentre);
        this.visitTypeList = ko.observableArray(lookupResponse.visitType);

        if (model == undefined) {
            this.id = ko.observable();
            this.isActive = ko.observable("1");
            this.centreId = ko.observable();
            this.busId = ko.observable();
            this.driverId = ko.observable();
            this.visitTypeId = ko.observable();
            this.bookingId = ko.observable();
            this.inchargeName = ko.observable();
            this.visitDate = ko.observable();
            this.outTime = ko.observable();
            this.returnTime = ko.observable();
            this.readingWhenFilling = ko.observable();

            //only for fueling
            this.pumpLocation = ko.observable();
            this.fuelRate = ko.observable();
            this.fuelAmount = ko.observable();

            //for booking only
            this.isBookingCompleted = ko.observable();

            this.description = ko.observable();
            this.initialReading = ko.observable();
            this.finalReading = ko.observable();
            this.busDesc = ko.observable();
            this.centreDesc = ko.observable();
            this.driverDesc = ko.observable();
            this.visitTypeDesc = ko.observable();

            this.outTimeSlotSelected = ko.observable();
            this.returnTimeSlotSelected = ko.observable();
            this.busSelected = ko.observable();
            this.driverSelected = ko.observable();
            this.alkhidmatCentreSelected = ko.observable();
            this.visitTypeSelected = ko.observable();


            this.isPatrolPump = ko.computed({
                owner: this,
                read: () => {
                    if (this.visitTypeSelected() != undefined && helper.VisitTypes[this.visitTypeSelected().id] == helper.VisitTypes[helper.VisitTypes.PatrolPump]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            this.isBooking = ko.computed({
                owner: this,
                read: () => {
                    if (this.visitTypeSelected() != undefined && helper.VisitTypes[this.visitTypeSelected().id] == helper.VisitTypes[helper.VisitTypes.Booking]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        }
        else {
            this.id = ko.observable(model.get("id"));
            this.isActive = ko.observable(model.get("isActive"));
            this.centreId = ko.observable(model.get("centreId"));
            this.busId = ko.observable(model.get("busId"));
            this.driverId = ko.observable(model.get("drvierId"));
            this.visitTypeId = ko.observable(model.get("visitTypeId"));
            this.bookingId = ko.observable(model.get("bookingId"));
            this.inchargeName = ko.observable(model.get("inchargeName"));
            this.visitDate = ko.observable(model.get("visitDate"));
            this.outTime = ko.observable(model.get("outTime"));
            this.returnTime = ko.observable(model.get("returnTime"));
            this.readingWhenFilling = ko.observable(model.get("readingWhenFilling"));

            //only for fueling
            if (model.get("pumpLocation") != undefined && model.get("pumpLocation").trim() == "") this.pumpLocation = ko.observable();
            else this.pumpLocation = ko.observable(model.get("pumpLocation"));

            if (model.get("fuelRate") != undefined && model.get("fuelRate") == "0") this.fuelRate = ko.observable();
            else this.fuelRate = ko.observable(model.get("fuelRate"));
            if (model.get("fuelAmount") != undefined && model.get("fuelAmount") == "0") this.fuelAmount = ko.observable();
            else this.fuelAmount = ko.observable(model.get("fuelAmount"));

            //for booking only
            this.isBookingCompleted = ko.observable(model.get("isBookingCompleted"));

            this.description = ko.observable(model.get("description"));
            this.initialReading = ko.observable(model.get("initialReading"));
            this.finalReading = ko.observable(model.get("finalReading"));
            this.busDesc = ko.observable(model.get("busDesc"));
            this.centreDesc = ko.observable(model.get("centreDesc"));
            this.driverDesc = ko.observable(model.get("driverDesc"));
            this.visitTypeDesc = ko.observable(model.get("visitTypeDesc"));

            var outTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("outTime"); });
            var inTime = _.filter(lookupResponse.timeSlot, (p) => { return p.id == model.get("returnTime"); });
            var bus = _.filter(lookupResponse.bus, (p) => { return p.id == model.get("busId"); });
            var driver = _.filter(lookupResponse.driver, (p) => { return p.id == model.get("driverId"); });
            var centre = _.filter(lookupResponse.alkhidmatCentre, (p) => { return p.id == model.get("centreId"); });
            var visitType = _.filter(lookupResponse.visitType, (p) => { return p.id == model.get("visitTypeId"); });

            this.outTimeSlotSelected = ko.observable(outTime[0]);
            this.returnTimeSlotSelected = ko.observable(inTime[0]);
            this.busSelected = ko.observable(bus[0]);
            this.driverSelected = ko.observable(driver[0]);
            this.alkhidmatCentreSelected = ko.observable(centre[0]);
            this.visitTypeSelected = ko.observable(visitType[0]);


            this.isPatrolPump = ko.computed({
                owner: this,
                read: () => {
                    if (this.visitTypeSelected() != undefined && helper.VisitTypes[this.visitTypeSelected().id] == helper.VisitTypes[helper.VisitTypes.PatrolPump]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            this.isBooking = ko.computed({
                owner: this,
                read: () => {
                    if (this.visitTypeSelected() != undefined && helper.VisitTypes[this.visitTypeSelected().id] == helper.VisitTypes[helper.VisitTypes.Booking]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        }
    }
}

export class BusMilageCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = BusMilageItemView;
        options.template = templateView.getOuterHTML("#gridTemplate");
        options.itemViewContainer = ".jsMilage tbody";
        options.events = {
            "click .jsSearchVisits": "SearchVisit"
        };
        super(options);
    }
    SearchVisit(e) {
        e.preventDefault();
        this.trigger("Event:BusMilage");
    }

    setOptionDisable(option, item) {
        if (item.id == 1) {
            //debugger;
            ko.applyBindingsToNode(option, { disable: true, text: item.description + ' - Maintenance' }, item);
        }
    }
}

export class BusMilageItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateView.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        //options.events = {
        //    "click .jsShowDetail": "ShowDetail"
        //};
        super(options);
    }
    ShowDetail() {
        this.trigger("ShowDetail");
    }
}
