var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./RefundBookingView", "../Dtos/RefundBookingDto", "../DAL/RefundBooking", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var RefundBookingCtrl = (function (_super) {
        __extends(RefundBookingCtrl, _super);
        function RefundBookingCtrl() {
            _super.call(this);

            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.RefundBookingDto();
            this.viewModel = new views.RefundBookingViewModel(this.backboneModel, this);
            this.view = new views.RefundBookingView({ viewModel: this.viewModel });
        }
        RefundBookingCtrl.prototype.Show = function () {
            var _this = this;
            var url = window.location.href;
            if (url.indexOf("id=") > -1) {
                var id = (url.substring(url.indexOf("id=") + 3, url.length));
                var deferredById = DAL.GetById(id);
                deferredById.done(function (p) {
                    return _this.GetByIdCompleted(p);
                });
            } else {
                this.Load();
            }
        };

        RefundBookingCtrl.prototype.Load = function () {
            var _this = this;
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));

            var refundModel = this.backboneModel;
            this.viewModel.bbModel = refundModel;
            this.viewModel.model = kb.viewModel(refundModel);

            refundModel.set("name", "");
            refundModel.set("address", "");
            refundModel.set("landmarkIdSelected", "");
            refundModel.set("landmarkList", lookupResponse.landmark);
            refundModel.set("contactNo1", "");
            refundModel.set("contactNo2", "");
            refundModel.set("isCoPartner", "");
            refundModel.set("isActive", "");

            this.viewModel = new views.RefundBookingViewModel(refundModel, this);
            this.view = new views.RefundBookingView({ viewModel: this.viewModel });
            this.view.on("Event:SaveForm", function () {
                return _this.Save(_this.view.model);
            });
            this.view.on("Event:CancelForm", function () {
                return _this.Cancel();
            });

            this.app.MainRegion.show(this.view);
        };

        RefundBookingCtrl.prototype.GetByIdCompleted = function (refundDto) {
            var _this = this;
            this.backboneModel = new Backbone.Model(refundDto["refundBookingModel"]);
            var refundModel = this.backboneModel;

            this.UIBinding(refundModel);

            this.view = new views.RefundBookingView({ viewModel: this.viewModel });
            this.view.on("Event:SaveForm", function () {
                return _this.Save(_this.viewModel.bbModel);
            });
            this.view.on("Event:CancelForm", function () {
                return _this.Cancel();
            });

            this.app.MainRegion.show(this.view);
        };

        RefundBookingCtrl.prototype.Save = function (refund) {
            var _this = this;
            var appObj = this.app.request("AppGlobalSetting");
            refund.set("modifiedBy", appObj.get("Id"));
            refund.set("refundTypeId", refund.get("refundTypeSelected").id);
            refund.set("refundOfficeLocation", refund.get("alkhidmatCentreSelected").id);
            refund.set("refundOfficer", refund.get("cashierSelected").id);
            refund.set("isActive", refund.get("isActive") == "1" ? true : false);
            var deferred = DAL.Save(refund);
            deferred.done(function (p) {
                return _this.SaveCompleted(p);
            });
        };

        RefundBookingCtrl.prototype.SaveCompleted = function (refundDto) {
            var result = new Backbone.Model(refundDto);
            if (result.get("errorMessage") != undefined && result.get("errorMessage").trim() != "") {
                helper.ShowModalPopup("danger", "Booking", "Due to some technical reason booking payment have not been saved successfully!<br> Pelase try later");
            } else {
                helper.ShowModalPopup("success", "Booking", "Record has been saved successfully with ID : " + refundDto["id"]);
                this.Cancel();
            }
        };

        RefundBookingCtrl.prototype.Cancel = function () {
            window.location.href = "#viewBooking";
        };

        RefundBookingCtrl.prototype.UIBinding = function (refundModel) {
            var lookupResponse = JSON.parse(localStorage.getItem('lookupResponse'));
            refundModel.set("alkhidmatCentreList", lookupResponse.alkhidmatCentre);
            refundModel.set("cashierList", lookupResponse.cashier);
            refundModel.set("refundTypeList", lookupResponse.refundType);

            var centre = _.filter(lookupResponse.alkhidmatCentre, function (p) {
                return p.id == refundModel.get("refundOfficeLocation");
            });
            refundModel.set("alkhidmatCentreSelected", centre[0]);

            var cashier = _.filter(lookupResponse.cashier, function (p) {
                return p.id == refundModel.get("refundOfficer");
            });
            refundModel.set("cashierSelected", cashier[0]);

            var refundType = _.filter(lookupResponse.refundType, function (p) {
                return p.id == refundModel.get("refundTypeId");
            });
            refundModel.set("refundTypeSelected", refundType[0]);

            this.viewModel.bbModel = refundModel;
            this.viewModel.model = kb.viewModel(refundModel);
            ko.cleanNode($(this.view.el)[0]);
            ko.applyBindings(this.viewModel, this.view.el);
        };
        return RefundBookingCtrl;
    })(helper.Controller);
    exports.RefundBookingCtrl = RefundBookingCtrl;
});
