/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class NearestCentreDto extends Backbone.Model {
        default() {
            return {
                centreId: "",
                bookingId: "",
                centreName: "",
                busList: "",
                address: "",
                contactNo1: "",
                contactNo2: "",
                outTime: "",
                returnTime: "",
                busPoint: "",
                graveyard: "",
                masjidName: "",
                namazEJanazaHeldIn: "",
                namazEJanazLocation: "",
                otherDetail: "",
                vehicleNo: "",
                centreAddress: "",
                mobileNo: "",
                fullName: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }
    export class NearestCentreDtoCollection extends Backbone.Collection {
        constructor(options?) {
            this.model = NearestCentreDto;
            super(options);
        }
    }
}
