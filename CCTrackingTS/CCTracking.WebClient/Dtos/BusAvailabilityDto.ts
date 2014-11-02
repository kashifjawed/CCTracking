/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class BusAvailabilityDto extends Backbone.Model {
        default() {
            return {
                id: "",
                centreId: "",
                busId: "",
                driverId: "",
                visitTypeId: "",
                bookingId: "",
                isBookingCompleted: "",
                description: "",
                busDesc: "",
                centreDesc: "",
                driverDesc: "",
                visitTypeDesc: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }
    export class BusAvailabilityCollection extends Backbone.Collection {
        constructor(options?) {
            this.model = BusAvailabilityDto;
            super(options);
        }
    }
}
