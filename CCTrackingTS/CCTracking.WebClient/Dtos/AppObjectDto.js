var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone"], function(require, exports) {
    /// <reference path="../../Scripts/typings/require/require.d.ts" />
    /// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
    /// <amd-dependency path="backbone"/>
    (function (Models) {
        var AppObject = (function (_super) {
            __extends(AppObject, _super);
            function AppObject() {
                _super.apply(this, arguments);
            }
            AppObject.prototype.default = function () {
                return {
                    UserName: "",
                    FirstName: "",
                    LastName: "",
                    AuthenticationToken: ""
                };
            };
            return AppObject;
        })(Backbone.Model);
        Models.AppObject = AppObject;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=AppObjectDto.js.map
