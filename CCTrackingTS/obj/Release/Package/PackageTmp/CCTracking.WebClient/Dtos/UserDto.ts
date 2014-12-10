/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>

export module Models {
    export class UserDto extends Backbone.Model {
        default() {
            return {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                cnic: "",
                address: "",
                city: "",
                userName: "",
                password: "",
                centreId: "",
                centreDesc: "",
                roleId: "",
                roleDesc: "",
                isAdmin: false,
                authenticationToken: "",
                authenticationErrorMessage: ""
            }
        }
    }
    export class UserCollection extends Backbone.Collection {
        constructor(options?: any) {
            this.model = UserDto;
            super(options);
        }
    }
}
//aaa