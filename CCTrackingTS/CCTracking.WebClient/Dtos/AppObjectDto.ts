/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>
export module Models {
    export class AppObject extends Backbone.Model {
        default() {
            return {
                UserName: "",
                FirstName: "",
                LastName: "",
                AuthenticationToken: ""
            }
        }
    }
}