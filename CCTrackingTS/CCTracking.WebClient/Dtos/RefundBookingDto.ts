/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class RefundBookingDto extends Backbone.Model {
        default() {
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
                refundOfficer:"",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }

    export class AuditRefundBooking extends Backbone.Model {
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
    export class AuditRefundBookingResponseCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = AuditRefundBooking;
            super(options);
        }
    }
}
