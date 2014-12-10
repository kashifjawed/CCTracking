/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="backbone"/>
    (function (Models) {
        var RefundBookingDto = (function (_super) {
            __extends(RefundBookingDto, _super);
            function RefundBookingDto() {
                _super.apply(this, arguments);
            }
            RefundBookingDto.prototype.default = function () {
                return {
                    id: "",
                    bookingId: "",
                    actualBookingAmount: "",
                    refundOfficeLocation: "",
                    refundTypeId: "",
                    refundAmount: "",
                    amountDeducted: "",
                    refundReason: "",
                    refundReceipt: "",
                    refundOfficer: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return RefundBookingDto;
        })(Backbone.Model);
        Models.RefundBookingDto = RefundBookingDto;

        var AuditRefundBooking = (function (_super) {
            __extends(AuditRefundBooking, _super);
            function AuditRefundBooking() {
                _super.apply(this, arguments);
            }
            AuditRefundBooking.prototype.default = function () {
                return {
                    id: "",
                    bookingId: "",
                    propertyName: "",
                    oldValue: "",
                    newValue: "",
                    modifiedDate: "",
                    createdDate: "",
                    actualModifiedDate: "",
                    userName: ""
                };
            };
            return AuditRefundBooking;
        })(Backbone.Model);
        Models.AuditRefundBooking = AuditRefundBooking;
        var AuditRefundBookingResponseCollection = (function (_super) {
            __extends(AuditRefundBookingResponseCollection, _super);
            function AuditRefundBookingResponseCollection(options) {
                this.model = AuditRefundBooking;
                _super.call(this, options);
            }
            return AuditRefundBookingResponseCollection;
        })(Backbone.Collection);
        Models.AuditRefundBookingResponseCollection = AuditRefundBookingResponseCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=RefundBookingDto.js.map
