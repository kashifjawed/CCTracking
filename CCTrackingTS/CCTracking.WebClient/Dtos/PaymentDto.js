﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
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
        var PaymentRequest = (function (_super) {
            __extends(PaymentRequest, _super);
            function PaymentRequest() {
                _super.apply(this, arguments);
            }
            PaymentRequest.prototype.default = function () {
                return {
                    bookingId: "",
                    paymentType: "",
                    pricing: "",
                    amount: "",
                    paymentLocation: "",
                    officerId: "",
                    receiptNo: "",
                    extraAmountCharge: "",
                    extraAmountReason: "",
                    extraAmountReceipt: "",
                    paymentStatus: ""
                };
            };
            return PaymentRequest;
        })(Backbone.Model);
        Models.PaymentRequest = PaymentRequest;

        var PaymentResponse = (function (_super) {
            __extends(PaymentResponse, _super);
            function PaymentResponse() {
                _super.apply(this, arguments);
            }
            PaymentResponse.prototype.default = function () {
                return {
                    bookingId: "",
                    paymentType: "",
                    pricing: "",
                    amount: "",
                    paymentLocation: "",
                    officerId: "",
                    receiptNo: "",
                    extraAmountCharge: "",
                    extraAmountReason: "",
                    extraAmountReceipt: "",
                    paymentStatus: "",
                    easyPaisaTranNo: ""
                };
            };
            return PaymentResponse;
        })(Backbone.Model);
        Models.PaymentResponse = PaymentResponse;

        var AuditPayment = (function (_super) {
            __extends(AuditPayment, _super);
            function AuditPayment() {
                _super.apply(this, arguments);
            }
            AuditPayment.prototype.default = function () {
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
            return AuditPayment;
        })(Backbone.Model);
        Models.AuditPayment = AuditPayment;

        var PaymentResponseCollection = (function (_super) {
            __extends(PaymentResponseCollection, _super);
            function PaymentResponseCollection(options) {
                this.model = PaymentResponse;
                _super.call(this, options);
            }
            return PaymentResponseCollection;
        })(Backbone.Collection);
        Models.PaymentResponseCollection = PaymentResponseCollection;

        var AuditPaymentResponseCollection = (function (_super) {
            __extends(AuditPaymentResponseCollection, _super);
            function AuditPaymentResponseCollection(options) {
                this.model = AuditPayment;
                _super.call(this, options);
            }
            return AuditPaymentResponseCollection;
        })(Backbone.Collection);
        Models.AuditPaymentResponseCollection = AuditPaymentResponseCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=PaymentDto.js.map
