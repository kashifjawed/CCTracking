/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>



export module Models {
    export class LoginDto extends Backbone.Model {
        default() {
            return {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                nic: "",
                userName: "",
                password: "",
                resetPassword: "",
                isAdmin: false,
                authenticationToken: "",
                errorMessage: ""
            };
        }
    }    
}

