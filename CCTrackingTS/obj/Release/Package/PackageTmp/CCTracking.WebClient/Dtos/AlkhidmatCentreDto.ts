/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {


    export class StationDto extends Backbone.Model {
        default() {
            return {
                id: "",
                name: "",
                landmarkId: "",
                address: "",
                contactNo1: "",
                contactNo2: "",
                isCoPartner: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }

    export class StationCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = StationDto;
            super(options);
        }
    }
}
