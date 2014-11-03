/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class BusDto extends Backbone.Model {
        default() {
            return {
                id: "",
                stationId: "",
                trackingDeviceId: "",
                vehicleNo: "",
                no: "",
                modelNo: "",
                description: "",
                initialReading:"",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            };
        }
    }
    export class BusCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = BusDto;
            super(options);
        }
    }
}


