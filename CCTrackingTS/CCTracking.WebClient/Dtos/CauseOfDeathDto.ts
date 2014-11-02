/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class CauseOfDeathDto extends Backbone.Model {
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
    export class CauseOfDeathCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = CauseOfDeathDto;
            super(options);
        }
    }
}


