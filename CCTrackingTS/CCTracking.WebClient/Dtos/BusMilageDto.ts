/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>

export module Models {
    export class BusMilageDto extends Backbone.Model {
        default() {
            return {
                id: "",
                centreId: "",
                busId: "",                
                visitTypeId: "",                
                isActive: "",
                vehicleNo: "",
                centreDesc: "",                
                visitTypeDesc: "",
                TotalMilage: "",
                TotalVisits : "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: ""
            }
        }
    }
    export class BusMilageCollection extends Backbone.Collection {
        constructor(options?) {
            this.model = BusMilageDto;
            super(options);
        }
    }
}
