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
        var LoginDto = (function (_super) {
            __extends(LoginDto, _super);
            function LoginDto() {
                _super.apply(this, arguments);
            }
            LoginDto.prototype.default = function () {
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
            };
            return LoginDto;
        })(Backbone.Model);
        Models.LoginDto = LoginDto;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=LoginDto.js.map
