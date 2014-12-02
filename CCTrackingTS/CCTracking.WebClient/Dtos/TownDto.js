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
        var TownDto = (function (_super) {
            __extends(TownDto, _super);
            function TownDto() {
                _super.apply(this, arguments);
            }
            TownDto.prototype.default = function () {
                return {
                    id: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return TownDto;
        })(Backbone.Model);
        Models.TownDto = TownDto;
        var TownCollection = (function (_super) {
            __extends(TownCollection, _super);
            function TownCollection(options) {
                this.model = TownDto;
                _super.call(this, options);
            }
            return TownCollection;
        })(Backbone.Collection);
        Models.TownCollection = TownCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
