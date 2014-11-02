/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "marionette", "jquery", "knockout", "text!./BusAvailability.html", "text!./BusAvailabilityGrid.html"], function(require, exports, helper) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BusAvailability.html"/>
    /// <amd-dependency path="text!./BusAvailabilityGrid.html"/>
    var _ = require('underscore');

    var templateView = require("text!./BusAvailability.html");
    var templateGrid = require("text!./BusAvailabilityGrid.html");

    var app;

    // View Model
    var BusAvailabilityViewModel = (function (_super) {
        __extends(BusAvailabilityViewModel, _super);
        function BusAvailabilityViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return BusAvailabilityViewModel;
    })(helper.ViewModel);
    exports.BusAvailabilityViewModel = BusAvailabilityViewModel;

    // View
    var BusAvailabilityView = (function (_super) {
        __extends(BusAvailabilityView, _super);
        function BusAvailabilityView(options) {
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsAvailability": "Availability"
            };
            _super.call(this, options);
        }
        BusAvailabilityView.prototype.close = function () {
            //alert("closeing this view");
            this.off("Event:SaveForm");
            this.off("Event:BusAvailability");
            this.off("Event:BusBookingDetail");
        };
        BusAvailabilityView.prototype.Availability = function () {
            this.trigger("Event:BusAvailability", this.model.get("alkhidmatCentreSelected").id);
        };
        BusAvailabilityView.prototype.Save = function (e) {
            e.preventDefault();
            this.trigger("Event:SaveForm");
        };
        return BusAvailabilityView;
    })(helper.Views.MvvmView);
    exports.BusAvailabilityView = BusAvailabilityView;

    var BusAvailabilityCollectionView = (function (_super) {
        __extends(BusAvailabilityCollectionView, _super);
        function BusAvailabilityCollectionView(options) {
            options.itemView = BusAvailabilityItemView;
            options.template = templateGrid.getOuterHTML("#gridTemplate");
            options.itemViewContainer = "tbody";
            options.events = {
                "click .jsSearchVisit": "SearchVisit"
            };
            _super.call(this, options);
        }
        BusAvailabilityCollectionView.prototype.SearchVisit = function (e) {
            e.preventDefault();
            this.trigger("Event:SearchVisit", this.model.get("busSelected").id);
        };

        BusAvailabilityCollectionView.prototype.setOptionDisable = function (option, item) {
            alert("dddddd");
        };
        return BusAvailabilityCollectionView;
    })(helper.Views.CompositeView);
    exports.BusAvailabilityCollectionView = BusAvailabilityCollectionView;

    var BusAvailabilityItemView = (function (_super) {
        __extends(BusAvailabilityItemView, _super);
        //vehicleNo: string;
        function BusAvailabilityItemView(options) {
            var _this = this;
            if (!options)
                options = {};
            options.template = templateGrid.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                //"click .jsShowDetail": "ShowDetail",
                "click .jsShowBusDetail": "ShowBusDetail"
            };
            _super.call(this, options);

            this.templateHelpers = {
                //return{
                showBuses: function () {
                    if (_this.model != undefined) {
                        var busList = _this.model.get("busList") === null ? "" : _this.model.get("busList");
                        var busLink = "";
                        if (busList != "") {
                            var busArray = busList.split("|");

                            for (var i = 0; i < busArray.length; i++) {
                                if (busArray[i].trim().indexOf("0 ") >= 0) {
                                    busLink = busLink + " <a href='javasript:void(0);?id=" + busArray[i].trim().split(" ")[1] + "' class='jsShowBusDetail btn-danger'>" + busArray[i] + '</a> &nbsp; | ';
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
                showMessage1: function () {
                    return "this is the coolest!SSS";
                }
            };
        }
        BusAvailabilityItemView.prototype.ShowBusDetail = function (e) {
            var busId = e.target.href.split("=")[1];
            this.trigger("Event:BusBookingDetail", busId); // this.model.get("busId"));
        };

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
        BusAvailabilityItemView.prototype.ShowDetail = function () {
            this.trigger("ShowDetail");
        };
        return BusAvailabilityItemView;
    })(helper.Views.ItemView);
    exports.BusAvailabilityItemView = BusAvailabilityItemView;
});
//# sourceMappingURL=BusAvailabilityView.js.map
