﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
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
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
