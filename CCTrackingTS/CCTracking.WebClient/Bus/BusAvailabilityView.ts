/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />

/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./BusAvailability.html"/>
/// <amd-dependency path="text!./BusAvailabilityGrid.html"/>

var _ = require('underscore');
import helper = require("../Helper");
var templateView = require("text!./BusAvailability.html");
var templateGrid = require("text!./BusAvailabilityGrid.html");
import application = require("../App");
var app;

// View Model
export class BusAvailabilityViewModel extends helper.ViewModel {
    constructor(model: any, controller: any) {
        super(model, controller);
    }
}

// View
export class BusAvailabilityView extends helper.Views.MvvmView {
    constructor(options?) {
        this.template = templateView;
        this.events = {
            "submit": "Save",
            "click .jsAvailability": "Availability"
        }
        super(options);
    }
    close() {
        //alert("closeing this view");
        this.off("Event:SaveForm");
        this.off("Event:BusAvailability");
        this.off("Event:BusBookingDetail");
    }
    Availability() {
        this.trigger("Event:BusAvailability", this.model.get("alkhidmatCentreSelected").id);
    }
    Save(e) {
        e.preventDefault();
        this.trigger("Event:SaveForm");
    }
}

export class BusAvailabilityCollectionView extends helper.Views.CompositeView {
    dataTable: any;
    constructor(options?: any) {
        options.itemView = BusAvailabilityItemView;
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
        alert("dddddd");

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

export class BusAvailabilityItemView extends helper.Views.ItemView {
    //vehicleNo: string;

    constructor(options?: any) {
        
        if (!options) options = {};
        options.template = templateGrid.getOuterHTML("#rowTemplate");
        options.tagName = "tr";
        options.className = "jsRowClick";
        options.events = {
            //"click .jsShowDetail": "ShowDetail",
            "click .jsShowBusDetail" : "ShowBusDetail"
        };
        super(options);
        
        this.templateHelpers = {
            //return{
            showBuses: () => {
                if (this.model != undefined) {
                    var busList = this.model.get("busList") === null ? "" : this.model.get("busList");
                    var busLink = "";
                    if (busList != "") {
                        var busArray = busList.split("|");
                        //debugger;
                        for (var i = 0; i < busArray.length; i++) {
                            if (busArray[i].trim().indexOf("0 ") >= 0) {
                                busLink = busLink + " <a href='javasript:void(0);?id=" + busArray[i].trim().split(" ")[1]  + "' class='jsShowBusDetail btn-danger'>" + busArray[i] + '</a> &nbsp; | ';
                            } else {
                                busLink = busLink + " <span class='btn-success'>" + busArray[i] + '</span> &nbsp; | ';
                            }
                        }
                        if (busLink != "")
                            busLink = busLink.substring(0, busLink.length - 2);
                    }
                    return busLink;
                } else {
                    return "";
                }
            },
            showMessage1: () => "this is the coolest!SSS"
            //}
        }
    }

    ShowBusDetail(e) {
        var busId = e.target.href.split("=")[1];
        this.trigger("Event:BusBookingDetail", busId);// this.model.get("busId"));
    }

   

//render() {
        
    //    var busList = this.model.get("busList") === null ? "" : this.model.get("busList");
    //    var busLink = "";
    //    if (busList != "") {
    //        var busArray = busList.split("|");
    //        for (var i = 0; i < busArray.length; i++) {
    //            if (busArray[i].trim().indexOf("0 ") >= 0) {
    //                busLink = busLink + " <a href='#' class='btn-danger'>" + busArray[i] + '</a> &nbsp; | ';
    //            } else {
    //                busLink = busLink + " <span class='btn-success'>" + busArray[i] + '</span> &nbsp; | ';
    //            }
    //        }
    //        if (busLink != "")
    //            busLink = busLink.substring(0, busLink.length - 2);
    //    }
    //    this.$el.html("<td class='input-sm'>" + this.model.get("centreName") + "</td><td class='input-sm'>" + busLink + "</td>");
    //    return this;
    //}


    ShowDetail() {
        this.trigger("ShowDetail");
    }
}

 