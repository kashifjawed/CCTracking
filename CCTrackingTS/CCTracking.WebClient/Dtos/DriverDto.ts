/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class DriverDto extends Backbone.Model {
        default() {
            return {
                id: "",
                stationId: "",
                firstName: "",
                lastName: "",
                cnic: "",
                mobile:"",
                address: "",
                city: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: "" 
            };
        }
    }
    export class DriverCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = DriverDto;
            super(options);
        }
    }
}


