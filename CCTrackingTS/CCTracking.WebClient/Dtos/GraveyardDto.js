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
        var GraveyardDto = (function (_super) {
            __extends(GraveyardDto, _super);
            function GraveyardDto() {
                _super.apply(this, arguments);
            }
            GraveyardDto.prototype.default = function () {
                return {
                    id: "",
                    landmarkId: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return GraveyardDto;
        })(Backbone.Model);
        Models.GraveyardDto = GraveyardDto;
        var GraveyardCollection = (function (_super) {
            __extends(GraveyardCollection, _super);
            function GraveyardCollection(options) {
                this.model = GraveyardDto;
                _super.call(this, options);
            }
            return GraveyardCollection;
        })(Backbone.Collection);
        Models.GraveyardCollection = GraveyardCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=GraveyardDto.js.map
