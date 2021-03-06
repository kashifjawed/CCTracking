﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class BusVisitDto extends Backbone.Model {
        default() {
            return {
                id: "",
                centreId: "",
                busId: "",
                driverId: "",
                visitTypeId: "",
                bookingId: "",
                inchargeName: "",
                visitDate: "",
                outTime: "",
                returnTime: "",
                readingWhenFilling: "",
                pumpLocation: "",
                fuelRate: "",
                fuelAmount: "",
                isBookingCompleted: "",
                description:"",
                initialReading: "",
                finalReading: "",
                isActive: "",
                busDesc: "",
                centreDesc: "",
                driverDesc: "",
                visitTypeDesc: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }
    export class BusVisitCollection extends Backbone.Collection {
        constructor(options?) {
            this.model = BusVisitDto;
            super(options);
        }
    }
    export class BusVisitSummaryDto extends Backbone.Model {
        default() {
            return {
                busId: "",
                busDesc: "",
                driverDesc: "",
                centreDesc: "",
                milage: "",
                visitCount: "",
                vehicleNo: "",
                visitDate: "",
                visitInterval: "",
                bookingId: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            };
        }
    }
    export class BusVisitSummaryCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = BusVisitSummaryDto;
            super(options);
        }
    }
}
