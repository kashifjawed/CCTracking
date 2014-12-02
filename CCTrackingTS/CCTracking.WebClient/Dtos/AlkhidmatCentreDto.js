/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="backbone"/>
    (function (Models) {
        var StationDto = (function (_super) {
            __extends(StationDto, _super);
            function StationDto() {
                _super.apply(this, arguments);
            }
            StationDto.prototype.default = function () {
                return {
                    id: "",
                    name: "",
                    landmarkId: "",
                    address: "",
                    contactNo1: "",
                    contactNo2: "",
                    isCoPartner: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return StationDto;
        })(Backbone.Model);
        Models.StationDto = StationDto;

        var StationCollection = (function (_super) {
            __extends(StationCollection, _super);
            function StationCollection(options) {
                this.model = StationDto;
                _super.call(this, options);
            }
            return StationCollection;
        })(Backbone.Collection);
        Models.StationCollection = StationCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
