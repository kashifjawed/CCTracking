/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./AdminSearchBookingView", "../../Dtos/BookingSummaryDto", "../../DAL/AdminSearch", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var app;

    var AdminSearchBookingCtrl = (function (_super) {
        __extends(AdminSearchBookingCtrl, _super);
        function AdminSearchBookingCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BookingSummaryDto();
            this.searchViewModel = new views.SearchViewModel(this.backboneModel, this);

            //this.searchView = new views.SearchView({ viewModel: this.searchViewModel });
            this.compositeModel = new Backbone.Model();
            this.backboneCollection = new Backbone.Collection([]);
            this.collectionView = new views.SearchCollectionView({ collection: this.backboneCollection, model: this.compositeModel });
            this.backboneCollection.reset([]);
        }
        AdminSearchBookingCtrl.prototype.Show = function () {
            this.Load();
        };

        AdminSearchBookingCtrl.prototype.Load = function () {
            var _this = this;
            var model = this.backboneModel;

            model.set("fromBookingDate", helper.FormatDateString(Date.now()));
            model.set("toBookingDate", helper.FormatDateString(Date.now()));
            this.compositeModel = model;

            this.collectionView.listenTo(this.collectionView, "AdminSearchBooking", function () {
                return _this.GetByCriteria(_this.searchViewModel.bbModel);
            });

            this.collectionView.on("CancelForm", function () {
                return _this.Cancel();
            });
            this.app.MainRegion.show(this.collectionView);

            var vm = kb.viewModel(this.compositeModel);

            var fromBookingDate = $('#txtFromBookingDate')[0];
            ko.cleanNode(fromBookingDate);
            ko.applyBindings(vm, fromBookingDate);

            var toBookingDate = $('#txtToBookingDate')[0];
            ko.cleanNode(toBookingDate);
            ko.applyBindings(vm, toBookingDate);
        };

        AdminSearchBookingCtrl.prototype.GetByCriteria = function (bookingSummaryDto) {
            var _this = this;
            if (bookingSummaryDto.get("fromBookingDate").trim() != "") {
                bookingSummaryDto.set("fromBookingDate", helper.FormatDateString(bookingSummaryDto.get("fromBookingDate")));
            }
            if (bookingSummaryDto.get("toBookingDate").trim() != "") {
                bookingSummaryDto.set("toBookingDate", helper.FormatDateString(bookingSummaryDto.get("toBookingDate")));
            }
            var deferred = DAL.GetByCriteria(bookingSummaryDto);
            deferred.done(function (p) {
                return _this.GetByCriteriaCompleted(p);
            });
        };

        AdminSearchBookingCtrl.prototype.GetByCriteriaCompleted = function (bookingSummaryDto) {
            //TODO:Hack - need rework
            var result = bookingSummaryDto["bookingSummaryList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { alkhidmatCentre: result[i].alkhidmatCentre, unpaidAmount: result[i].unpaidAmount, paidAmount: result[i].paidAmount, paidBooking: result[i].paidBooking, unpaidBooking: result[i].unpaidBooking };
            }
            this.backboneCollection.reset(summary);
        };

        AdminSearchBookingCtrl.prototype.Cancel = function () {
            window.location.href = "#adminSearchBooking";
        };
        return AdminSearchBookingCtrl;
    })(helper.Controller);
    exports.AdminSearchBookingCtrl = AdminSearchBookingCtrl;
});
//# sourceMappingURL=AdminSearchBookingCtrl.js.map
