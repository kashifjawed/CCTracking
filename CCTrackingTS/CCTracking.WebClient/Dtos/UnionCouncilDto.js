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
        var UnionCouncilDto = (function (_super) {
            __extends(UnionCouncilDto, _super);
            function UnionCouncilDto() {
                _super.apply(this, arguments);
            }
            UnionCouncilDto.prototype.default = function () {
                return {
                    id: "",
                    townId: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return UnionCouncilDto;
        })(Backbone.Model);
        Models.UnionCouncilDto = UnionCouncilDto;
        var UnionCouncilCollection = (function (_super) {
            __extends(UnionCouncilCollection, _super);
            function UnionCouncilCollection(options) {
                this.model = UnionCouncilDto;
                _super.call(this, options);
            }
            return UnionCouncilCollection;
        })(Backbone.Collection);
        Models.UnionCouncilCollection = UnionCouncilCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
