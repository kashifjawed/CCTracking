/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class TrackingDeviceDto extends Backbone.Model {
        default() {
            return {
                id: "",
                trackingNo: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            };
        }
    }
    export class TrackingDeviceCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = TrackingDeviceDto;
            super(options);
        }
    }
}


