/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "../../Helper", "./BookingLeftView", "../../Dtos/BookingLeftDto", "../../DAL/BookingLeft", "../BookingCtrl", "marionette", "jquery", "knockout", "text!./BookingLeftTmpl.html"], function(require, exports, application, helper, views, dto, DAL, bookingCtrl) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./BookingLeftTmpl.html"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var BookingLeftCtrl = (function (_super) {
        __extends(BookingLeftCtrl, _super);
        //collection: dto.Models.BookingLeftCollection;
        //collectionView: views.BookingLeftCollectionView;
        function BookingLeftCtrl() {
            _super.call(this);

            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.BookingLeftDto();
            this.bookingLeftViewModel = new views.BookingLeftViewModel(this.backboneModel, this);
            this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel });
            // this.collection = new dto.Models.BookingLeftCollection({});
            //this.collectionView = new views.BookingLeftCollectionView({ collection: this.collection });
        }
        BookingLeftCtrl.prototype.Show = function () {
            var _this = this;
            // debugger;
            var appObj = this.app.request("AppGlobalSetting");
            var model = new dto.Models.BookingLeftDto();
            model.set("officerId", appObj.get("Id"));
            var deferredById = DAL.GetByCriteria(model);
            deferredById.done(function (p) {
                return _this.GetByCriteriaCompleted(p);
            });
        };

        BookingLeftCtrl.prototype.GetByCriteriaCompleted = function (bookingLeftDto) {
            var _this = this;
            //alert("GetByIdCompleted..");
            this.backboneModel = new Backbone.Model(bookingLeftDto["bookingLeftModel"]);
            var model = this.backboneModel;

            this.UIBinding(model);

            this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel });

            this.bookingLeftView.on("ShowTotalBooking", function () {
                return _this.ShowTotalBooking();
            });
            this.bookingLeftView.on("ShowPaidBooking", function () {
                return _this.ShowPaidBooking();
            });
            this.bookingLeftView.on("ShowUnpaidBooking", function () {
                return _this.ShowUnpaidBooking();
            });
            this.bookingLeftView.on("ShowTodayBooking", function () {
                return _this.ShowTodayBooking();
            });

            //app = application.Application.getInstance();
            this.app.LeftRegion.show(this.bookingLeftView);
            //this.bookingLeftView = new views.BookingLeftView({ viewModel: this.bookingLeftViewModel });
        };

        BookingLeftCtrl.prototype.ShowTotalBooking = function () {
            new bookingCtrl.BookingCtrl().GetAll(1);
        };

        BookingLeftCtrl.prototype.ShowPaidBooking = function () {
            new bookingCtrl.BookingCtrl().GetAll(2);
        };

        BookingLeftCtrl.prototype.ShowUnpaidBooking = function () {
            new bookingCtrl.BookingCtrl().GetAll(3);
        };
        BookingLeftCtrl.prototype.ShowTodayBooking = function () {
            new bookingCtrl.BookingCtrl().GetAll(4);
        };

        BookingLeftCtrl.prototype.UIBinding = function (model) {
            this.bookingLeftViewModel.bbModel = model;
            this.bookingLeftViewModel.model = kb.viewModel(model);
            ko.cleanNode($(this.bookingLeftView.el)[0]);
            ko.applyBindings(this.bookingLeftViewModel, this.bookingLeftView.el);
        };
        return BookingLeftCtrl;
    })(helper.Controller);
    exports.BookingLeftCtrl = BookingLeftCtrl;
});
//# sourceMappingURL=BookingLeftCtrl.js.map
