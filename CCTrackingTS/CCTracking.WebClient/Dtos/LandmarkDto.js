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
        var LandmarkDto = (function (_super) {
            __extends(LandmarkDto, _super);
            function LandmarkDto() {
                _super.apply(this, arguments);
            }
            LandmarkDto.prototype.default = function () {
                return {
                    id: "",
                    UcId: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return LandmarkDto;
        })(Backbone.Model);
        Models.LandmarkDto = LandmarkDto;
        var LandmarkCollection = (function (_super) {
            __extends(LandmarkCollection, _super);
            function LandmarkCollection(options) {
                this.model = LandmarkDto;
                _super.call(this, options);
            }
            return LandmarkCollection;
        })(Backbone.Collection);
        Models.LandmarkCollection = LandmarkCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=LandmarkDto.js.map
