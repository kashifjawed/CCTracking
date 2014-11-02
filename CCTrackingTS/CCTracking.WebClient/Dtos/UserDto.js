/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone"], function(require, exports) {
    (function (Models) {
        var UserDto = (function (_super) {
            __extends(UserDto, _super);
            function UserDto() {
                _super.apply(this, arguments);
            }
            UserDto.prototype.default = function () {
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
                };
            };
            return UserDto;
        })(Backbone.Model);
        Models.UserDto = UserDto;
        var UserCollection = (function (_super) {
            __extends(UserCollection, _super);
            function UserCollection(options) {
                this.model = UserDto;
                _super.call(this, options);
            }
            return UserCollection;
        })(Backbone.Collection);
        Models.UserCollection = UserCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//aaa
//# sourceMappingURL=UserDto.js.map
