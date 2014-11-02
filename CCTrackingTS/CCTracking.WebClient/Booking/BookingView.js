/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "CCTracking.WebClient/Dtos/BookingDto", "./BookingCtrl", "../App", "marionette", "jquery", "jqueryUI", "knockout", "text!./BookingTmpl.html", "text!./BookingGrid.html", "text!./BokingGridRow.html"], function(require, exports, helper, bookingDto, bookingCtrl, application) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="jqueryUI"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BookingTmpl.html"/>
    /// <amd-dependency path="text!./BookingGrid.html"/>
    /// <amd-dependency path="text!./BokingGridRow.html"/>
    var _ = require('underscore');

    var templateView = require("text!./BookingTmpl.html");
    var templateGrid = require("text!./BookingGrid.html");
    var templateRow = require("text!./BokingGridRow.html");

    var app;

    var BookingViewModel = (function (_super) {
        __extends(BookingViewModel, _super);
        function BookingViewModel(model, controller) {
            var _this = this;
            _super.call(this, model, controller);
            this.model.busPointSelected.subscribe(function () {
                var list = GetUcList(_this.model.busPointSelected().id);
                _this.model.unionCouncilList(list);
            });

            this.model.unionCouncilIdSelected.subscribe(function () {
                var list = GetTownList(_this.model.unionCouncilIdSelected().id);
                _this.model.townList(list);
            });
        }
        return BookingViewModel;
    })(helper.ViewModel);
    exports.BookingViewModel = BookingViewModel;

    var BookingView = (function (_super) {
        __extends(BookingView, _super);
        function BookingView(options) {
            //if (!options)
            //    options = {};
            this.template = templateView;
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        BookingView.prototype.Cancel = function () {
            this.trigger("CancelForm");
        };
        BookingView.prototype.onDomRefresh = function () {
            //alert("ddd");
            //this.$el.find("#PickupDate").datepicker();
        };

        //onShow() {
        //    alert('dddd');
        //    //debugger;
        //    //this.$el.find("#PickupDate").datepicker();
        //}
        BookingView.prototype.Save = function (e) {
            e.preventDefault();

            //alert(this.viewModel.bbModel.get("causeOfDeathSelected").idd);
            //alert(this.viewModel.bbModel.get("contactName"));
            new bookingCtrl.BookingCtrl().Save(this.viewModel.bbModel);
        };

        BookingView.prototype.GetAllCompleted = function (bookingResponse) {
            //var a = templateGrid;
            app = application.Application.getInstance();
            var bookings = _.map(bookingResponse["bookingList"], function (item) {
                if (item.pickupDate != "0001-01-01T00:00:00")
                    item.pickupDate = helper.FormatDateString(item.pickupDate);
                else
                    item.pickupDate = "";
                return item;
            });
            var bookingCollection = new bookingDto.Models.BookingResponseCollection(bookings);

            //var model = new Backbone.Model();
            //model.set("itemCount", bookingCollection.length);
            var collectionView = new BookingCollectionView({ collection: bookingCollection });

            //var bookingGrid = collectionView.$("#tblBooking");
            app.MainRegion.show(collectionView);
        };
        return BookingView;
    })(helper.Views.MvvmView);
    exports.BookingView = BookingView;

    var BookingCollectionView = (function (_super) {
        __extends(BookingCollectionView, _super);
        function BookingCollectionView(options) {
            this.itemView = BookingItemView;
            this.template = templateGrid.getOuterHTML("#gridTemplate");
            this.itemViewContainer = "tbody";

            _super.call(this, options);
        }
        return BookingCollectionView;
    })(helper.Views.CompositeView);
    exports.BookingCollectionView = BookingCollectionView;

    var BookingItemView = (function (_super) {
        __extends(BookingItemView, _super);
        function BookingItemView(options) {
            //if (!options) options = {};
            options.template = templateRow.getOuterHTML("#rowTemplate");
            options.tagName = "tr";
            options.className = "jsRowClick";
            options.events = {
                "mouseover .jsShowDetail": "ShowDetail",
                "click .jsShowDetail": "ShowDetail"
            };

            _super.call(this, options);
        }
        BookingItemView.prototype.ShowDetail = function () {
            //new userCtrl.UserCtrl().ShowDetail(this.model);
        };
        return BookingItemView;
    })(helper.Views.ItemView);
    exports.BookingItemView = BookingItemView;

    function GetUcList(landmarkId) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        var ucList = _.filter(lookupResponse.unionCouncil, function (item) {
            return item.id == landmarkId;
        });
        return ucList;
    }

    function GetTownList(ucId) {
        var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
        var townList = _.filter(lookupResponse.town, function (item) {
            return item.id == ucId;
        });
        return townList;
    }
});
