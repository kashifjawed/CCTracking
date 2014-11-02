/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../Helper", "marionette", "jquery", "knockout", "text!./BusMilageGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BusMilageGrid.html"/>
    var _ = require('underscore');
    var ko = require("knockout");

    var templateView = require("text!./BusMilageGrid.html");

    var app;

    // View Model
    var BusMilageViewModel = (function (_super) {
        __extends(BusMilageViewModel, _super);
        function BusMilageViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return BusMilageViewModel;
    })(helper.ViewModel);
    exports.BusMilageViewModel = BusMilageViewModel;

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
    var ViewModel = (function () {
        function ViewModel(model) {
            var _this = this;
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
                    read: function () {
                        if (_this.visitTypeSelected() != undefined && helper.VisitTypes[_this.visitTypeSelected().id] == helper.VisitTypes[1 /* PatrolPump */]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isBooking = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.visitTypeSelected() != undefined && helper.VisitTypes[_this.visitTypeSelected().id] == helper.VisitTypes[2 /* Booking */]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            } else {
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
                if (model.get("pumpLocation") != undefined && model.get("pumpLocation").trim() == "")
                    this.pumpLocation = ko.observable();
                else
                    this.pumpLocation = ko.observable(model.get("pumpLocation"));

                if (model.get("fuelRate") != undefined && model.get("fuelRate") == "0")
                    this.fuelRate = ko.observable();
                else
                    this.fuelRate = ko.observable(model.get("fuelRate"));
                if (model.get("fuelAmount") != undefined && model.get("fuelAmount") == "0")
                    this.fuelAmount = ko.observable();
                else
                    this.fuelAmount = ko.observable(model.get("fuelAmount"));

                //for booking only
                this.isBookingCompleted = ko.observable(model.get("isBookingCompleted"));

                this.description = ko.observable(model.get("description"));
                this.initialReading = ko.observable(model.get("initialReading"));
                this.finalReading = ko.observable(model.get("finalReading"));
                this.busDesc = ko.observable(model.get("busDesc"));
                this.centreDesc = ko.observable(model.get("centreDesc"));
                this.driverDesc = ko.observable(model.get("driverDesc"));
                this.visitTypeDesc = ko.observable(model.get("visitTypeDesc"));

                var outTime = _.filter(lookupResponse.timeSlot, function (p) {
                    return p.id == model.get("outTime");
                });
                var inTime = _.filter(lookupResponse.timeSlot, function (p) {
                    return p.id == model.get("returnTime");
                });
                var bus = _.filter(lookupResponse.bus, function (p) {
                    return p.id == model.get("busId");
                });
                var driver = _.filter(lookupResponse.driver, function (p) {
                    return p.id == model.get("driverId");
                });
                var centre = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                    return p.id == model.get("centreId");
                });
                var visitType = _.filter(lookupResponse.visitType, function (p) {
                    return p.id == model.get("visitTypeId");
                });

                this.outTimeSlotSelected = ko.observable(outTime[0]);
                this.returnTimeSlotSelected = ko.observable(inTime[0]);
                this.busSelected = ko.observable(bus[0]);
                this.driverSelected = ko.observable(driver[0]);
                this.alkhidmatCentreSelected = ko.observable(centre[0]);
                this.visitTypeSelected = ko.observable(visitType[0]);

                this.isPatrolPump = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.visitTypeSelected() != undefined && helper.VisitTypes[_this.visitTypeSelected().id] == helper.VisitTypes[1 /* PatrolPump */]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
                this.isBooking = ko.computed({
                    owner: this,
                    read: function () {
                        if (_this.visitTypeSelected() != undefined && helper.VisitTypes[_this.visitTypeSelected().id] == helper.VisitTypes[2 /* Booking */]) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                });
            }
        }
        return ViewModel;
    })();
    exports.ViewModel = ViewModel;

    var BusMilageCollectionView = (function (_super) {
        __extends(BusMilageCollectionView, _super);
        function BusMilageCollectionView(options) {
            options.itemView = BusMilageItemView;
            options.template = templateView.getOuterHTML("#gridTemplate");
            options.itemViewContainer = ".jsMilage tbody";
            options.events = {
                "click .jsSearchVisits": "SearchVisit"
            };
            _super.call(this, options);
        }
        BusMilageCollectionView.prototype.SearchVisit = function (e) {
            e.preventDefault();
            this.trigger("Event:BusMilage");
        };

        BusMilageCollectionView.prototype.setOptionDisable = function (option, item) {
            if (item.id == 1) {
                //debugger;
                ko.applyBindingsToNode(option, { disable: true, text: item.description + ' - Maintenance' }, item);
            }
        };
        return BusMilageCollectionView;
    })(helper.Views.CompositeView);
    exports.BusMilageCollectionView = BusMilageCollectionView;

    var BusMilageItemView = (function (_super) {
        __extends(BusMilageItemView, _super);
        function BusMilageItemView(options) {
            if (!options)
                options = {};
            options.template = templateView.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";

            //options.events = {
            //    "click .jsShowDetail": "ShowDetail"
            //};
            _super.call(this, options);
        }
        BusMilageItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return BusMilageItemView;
    })(helper.Views.ItemView);
    exports.BusMilageItemView = BusMilageItemView;
});
