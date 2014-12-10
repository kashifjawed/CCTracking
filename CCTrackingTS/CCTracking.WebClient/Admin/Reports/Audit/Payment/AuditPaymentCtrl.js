/// <reference path="../../../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../../../App", "../../../../Helper", "./AuditPaymentView", "../../../../Dtos/PaymentDto", "../../../../DAL/Payment", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto, DAL) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    var AuditPaymentCtrl = (function (_super) {
        __extends(AuditPaymentCtrl, _super);
        function AuditPaymentCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.backboneModel = new dto.Models.AuditPayment();
            this.compositeModel = new Backbone.Model();
            this.backboneCollection = new Backbone.Collection([]);
            this.collectionView = new views.AuditPaymentCollectionView({ collection: this.backboneCollection });
            this.backboneCollection.reset([]);
        }
        AuditPaymentCtrl.prototype.Show = function () {
            var _this = this;
            var model = this.backboneModel;
            model.set("fromDate", helper.FormatDateString(Date.now()));
            model.set("toDate", helper.FormatDateString(Date.now()));
            this.compositeModel = model;
            this.collectionView.model = model;

            //var deferred = DAL.GetAllAuditBooking(null);
            //deferred.done(p=> this.AuditBookingCompleted(p));
            this.app.MainRegion.show(this.collectionView);
            this.collectionView.listenTo(this.collectionView, "Event:AuditPayment", function (auditRequest) {
                return _this.GetAuditPaymentDetial(auditRequest);
            });

            var vm = kb.viewModel(this.compositeModel);

            var fromDate = $('#txtFromDate')[0];
            ko.cleanNode(fromDate);
            ko.applyBindings(vm, fromDate);

            var toDate = $('#txtToDate')[0];
            ko.cleanNode(toDate);
            ko.applyBindings(vm, toDate);
        };

        AuditPaymentCtrl.prototype.GetAuditPaymentDetial = function (auditRequest) {
            var _this = this;
            var request = new Backbone.Model(auditRequest);
            if (request.get("fromDate") == "" || request.get("toDate") == "") {
                helper.ShowModalPopup("danger", "Audit Payment", "Please enter valid search criteria");
                return;
            }
            var deferred = DAL.GetAllAuditPayment(request);
            deferred.done(function (p) {
                return _this.AuditPaymentCompleted(p);
            });
        };
        AuditPaymentCtrl.prototype.AuditPaymentCompleted = function (auditDto) {
            //TODO:Hack - need rework
            var result = auditDto["auditPaymentDisplayList"];
            var summary = [];
            for (var i = 0; i < result.length; i++) {
                summary[i] = { bookingId: result[i].bookingId, userName: result[i].userName, propertyName: result[i].propertyName, oldValue: result[i].oldValue, newValue: result[i].newValue, actualModifiedDate: helper.FormatDateString(result[i].actualModifiedDate), rowCounter: result[i].rowCounter };
            }
            this.backboneCollection.reset(summary);
        };
        return AuditPaymentCtrl;
    })(helper.Controller);
    exports.AuditPaymentCtrl = AuditPaymentCtrl;
});
//# sourceMappingURL=AuditPaymentCtrl.js.map
