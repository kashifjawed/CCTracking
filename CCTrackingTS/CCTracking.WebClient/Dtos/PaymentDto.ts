﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class PaymentRequest extends Backbone.Model {
        default() {
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
            }
        }
    }

    export class PaymentResponse extends Backbone.Model {
        default() {
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
            }
        }
    }

    export class AuditPayment extends Backbone.Model {
        default() {
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
            }

        }
    }

    export class PaymentResponseCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = PaymentResponse;
            super(options);
        }
    }

    export class AuditPaymentResponseCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = AuditPayment;
            super(options);
        }
    }
}
