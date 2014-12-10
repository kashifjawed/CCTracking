/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class TownDto extends Backbone.Model {
        default() {
            return {
                id: "",
                name: "",
                isActive: "",
                createdBy: "",
                createdDate: "",
                modifiedBy: "",
                modifiedDate: "" 
            };
        }
    }
    export class TownCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = TownDto;
            super(options);
        }
    }
}


