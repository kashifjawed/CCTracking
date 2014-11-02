/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class SearchDto extends Backbone.Model {
        default() {
            return {
                id: "",
                name: "",
                landmarkId: "",
                address: "",
                contactNo1: "",
                contactNo2: "",
                isCoPartner: "",
                contactInfo: "",
                deseasedInfo: "",
                genderId: "",
                paymentStatusId: "",
                bookingDate: "",
                greveyardId: "",
                centreId: "",
                busId: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }

    export class SearchCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = SearchDto;
            super(options);
        }
    }
}
