/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./BusAvailabilityView", "../Dtos/BusAvailabilityDto", "../DAL/BusAvailability", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BusAvailabilityCtrl = (function (_super) {
        __extends(BusAvailabilityCtrl, _super);
        function BusAvailabilityCtrl() {
            _super.call(this);

            //alert("constructor");
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BusAvailabilityDto();
            this.viewModel = new views.BusAvailabilityViewModel(this.backboneModel, this);
            this.view = new views.BusAvailabilityView({ viewModel: this.viewModel });
            this.collection = new dto.Models.BusAvailabilityCollection({ id: "", busList: "", centreName: "" });
            this.collectionView = new views.BusAvailabilityCollectionView({ collection: this.collection });
            this.compositeModel = new Backbone.Model();
        }
        BusAvailabilityCtrl.prototype.Show = function () {
            var _this = this;
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
            this.view.listenTo(this.view, "Event:BusAvailability", function (centreId) {
                return _this.BusAvailability(centreId);
            });
            this.collectionView.listenTo(this.collectionView, "itemview:Event:BusBookingDetail", function (view, busId) {
                return _this.ShowBusBookingDetail(busId);
            });

            //this.collectionView.on("itemview:Event:BusBookingDetail", (nearestCentreModel) => this.ShowBusBookingDetail(nearestCentreModel));
            this.app.RightRegion.show(this.view);
            this.app.BusAvailabilityRegion.show(this.collectionView);
        };
        BusAvailabilityCtrl.prototype.ShowBusBookingDetail = function (busId) {
            var _this = this;
            var deferred = DAL.GetById(busId);
            deferred.done(function (p) {
                return _this.ShowBusBookingDetailCompleted(p);
            });
        };

        BusAvailabilityCtrl.prototype.ShowBusBookingDetailCompleted = function (model) {
            var busDetailCollection = new Backbone.Collection(model["nearestCentreList"]);
            var busDetail = new Backbone.Model();
            busDetail.set("type", "btn-warning");

            //busDetail.set("title", "BUS DETAIL");
            busDetail.set("message", "");

            //busDetail.set("message", "On Booking - Expected Retrun Time is : " + busDetail.get("outTime") + " - " + busDetail.get("returnTime"));
            helper.ShowBusDetailModalPopup(busDetail, busDetailCollection);
        };

        BusAvailabilityCtrl.prototype.BusAvailability = function (centreId) {
            var _this = this;
            //alert(centreId);
            var deferred = DAL.GetAll(centreId);
            deferred.done(function (p) {
                return _this.GetAllCompleted(p);
            });
        };

        BusAvailabilityCtrl.prototype.GetAllCompleted = function (dto) {
            this.collection.reset(dto["nearestCentreList"]);
            this.collectionView.collection = this.collection;
            //this.app.SubRegion.show(this.collectionView);
        };
        return BusAvailabilityCtrl;
    })(helper.Controller);
    exports.BusAvailabilityCtrl = BusAvailabilityCtrl;
});
//# sourceMappingURL=BusAvailabilityCtrl.js.map
