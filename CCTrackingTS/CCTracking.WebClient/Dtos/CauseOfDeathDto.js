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
        var CauseOfDeathDto = (function (_super) {
            __extends(CauseOfDeathDto, _super);
            function CauseOfDeathDto() {
                _super.apply(this, arguments);
            }
            CauseOfDeathDto.prototype.default = function () {
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
            return CauseOfDeathDto;
        })(Backbone.Model);
        Models.CauseOfDeathDto = CauseOfDeathDto;
        var CauseOfDeathCollection = (function (_super) {
            __extends(CauseOfDeathCollection, _super);
            function CauseOfDeathCollection(options) {
                this.model = CauseOfDeathDto;
                _super.call(this, options);
            }
            return CauseOfDeathCollection;
        })(Backbone.Collection);
        Models.CauseOfDeathCollection = CauseOfDeathCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=CauseOfDeathDto.js.map
