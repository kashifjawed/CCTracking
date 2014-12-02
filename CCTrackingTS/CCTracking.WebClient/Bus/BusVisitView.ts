/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusVisit.html"/>
/// <amd-dependency path="text!./BusVisitGrid.html"/>

var _ = require('underscore');
var ko = require("knockout");
import helper = require("../Helper");
var templateView = require("text!./BusVisit.html");
var templateGrid = require("text!./BusVisitGrid.html");
import application = require("../App");
var app;

// View Model
export class BusVisitViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
export class BusVisitView extends helper.Views.ItemView {
    viewModel: ViewModel;
    bbModel: Backbone.Model;
    constructor(options?) {
        this.template = templateView;
        this.viewModel = new ViewModel(options);
        this.bbModel = new Backbone.Model();
        this.events = {
            "submit": "Save",
            "click .jsCancel": "Cancel"
        }
        super(options);
    }
    close() {
        //alert("closeing this view");
        this.off("Event:SaveForm");
        this.off("Event:CancelForm");
    }
    Cancel() {
        this.trigger("Event:CancelForm");
    }
    Save(e) {
        e.preventDefault();

        this.bbModel.set("id", this.viewModel.id());
        this.bbModel.set("isActive", this.viewModel.isActive() == "1" ? true : false);
        //this.bbModel.set("centreId", this.viewModel.centreId());
        //this.bbModel.set("busId", this.viewModel.busId());
        //this.bbModel.set("driverId", this.viewModel.driverId());
        //this.bbModel.set("visitTypeId", this.viewModel.visitTypeId());
        this.bbModel.set("bookingId", this.viewModel.bookingId());
        this.bbModel.set("inchargeName", this.viewModel.inchargeName());
        this.bbModel.set("visitDate", this.viewModel.visitDate());
        //this.bbModel.set("outTime", this.viewModel.outTime());
        //this.bbModel.set("returnTime", this.viewModel.returnTime());
        this.bbModel.set("readingWhenFilling", this.viewModel.readingWhenFilling());
        this.bbModel.set("pumpLocation", this.viewModel.pumpLocation());
        this.bbModel.set("fuelRate", this.viewModel.fuelRate());
        this.bbModel.set("fuelAmount", this.viewModel.fuelAmount());
        this.bbModel.set("isBookingCompleted", this.viewModel.isBookingCompleted());
        this.bbModel.set("description", this.viewModel.description());
        this.bbModel.set("initialReading", this.viewModel.initialReading());
        this.bbModel.set("finalReading", this.viewModel.finalReading());
        this.bbModel.set("busDesc", this.viewModel.busDesc());
        this.bbModel.set("centreDesc", this.viewModel.centreDesc());
        this.bbModel.set("driverDesc", this.viewModel.driverDesc());
        this.bbModel.set("visitTypeDesc", this.viewModel.visitTypeDesc());

        this.bbModel.set("centreId", this.viewModel.alkhidmatCentreSelected().id);
        this.bbModel.set("driverId", this.viewModel.driverSelected().id);
        this.bbModel.set("busId", this.viewModel.busSelected().id);
        this.bbModel.set("outTime", this.viewModel.outTimeSlotSelected().id);
        this.bbModel.set("returnTime", this.viewModel.returnTimeSlotSelected().id);
        this.bbModel.set("visitTypeId", this.viewModel.visitTypeSelected().id);

        this.trigger("Event:SaveForm", this.bbModel);
    }
    onShow() {
        ko.applyBindings(this.viewModel, this.el);
    }
}

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
    isEdit:any;


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
            this.isEdit = ko.observable(false);
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
            this.isEdit = ko.observable(true);
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
            
            var flag = model.get("isBookingCompleted") == true ? "1" : "0";
            this.isBookingCompleted = ko.observable(flag); //ko.observable(model.get("isBookingCompleted"));

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

export class BusVisitCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = BusVisitItemView;
        options.template = templateGrid.getOuterHTML("#gridTemplate");
        options.itemViewContainer = "tbody";
        options.events = {
            "click .jsSearchVisit": "SearchVisit"
        };
        super(options);
    }
    SearchVisit(e) {
        e.preventDefault();
        this.trigger("Event:SearchVisit", this.model.get("busSelected").id);
    }

    setOptionDisable(option, item) {
        if (item.id == 1) {
            //debugger;
            ko.applyBindingsToNode(option, { disable: true, text: item.description + ' - Maintenance' }, item);
        }
    }

    //onShow() {

    //    this.dataTable = this.$el.find("#tblBooking").dataTable({
    //        "autoWidth": false,
    //        "info": true,
    //        "processing": true,
    //        //"scrollY": "500px",
    //        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    //        "language": {
    //            "paginate": {
    //                "next": "Next",
    //                "previous": "Prev"
    //            },
    //            "emptyTable": "No record found!",
    //            //"info": "Dispalying page _PAGE_ of _PAGES_",
    //            "infoEmpty": "No record found!",
    //            "zeroRecords": "kuch nahi milla"
    //        }
    //        //"pageLength": 50,

    //        //"lengthChange": false

    //        //"lengthMenu": [[5, 10, 15, 20], [5, 10, 15, 20]]

    //    });
    //}
}

export class BusVisitItemView extends helper.Views.ItemView {
    constructor(options?: any) {
        if (!options) options = {};
        options.template = templateGrid.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            "click .jsShowDetail": "ShowDetail"
        };
        
        //this.templateHelpers = () => {
        //    visitDateFormatted: {
        //        if (this.model.get("visitDate") != undefined) {
        //            this.model.set("visitDate", helper.FormatDateString(this.model.get("visitDate")));
        //        }
        //    }
        //}
        super(options);
    }
    ShowDetail() {
        this.trigger("ShowDetail");
    }
}

export function setOptionDisable(option, item) {
    alert("dddddd");
}