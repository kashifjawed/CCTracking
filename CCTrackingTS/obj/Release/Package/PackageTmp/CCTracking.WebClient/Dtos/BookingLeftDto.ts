/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class BookingLeftDto extends Backbone.Model {
        default() {
            return {
                officerId : "",
                todaysBooking: "",
                userTotalBooking: "",
                userPiadBooking: "",
                userUnpaidBooking: ""
            };
        }
    }
    export class DriverCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = BookingLeftDto;
            super(options);
        }
    }
}


