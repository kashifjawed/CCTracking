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
        var TrackingDeviceDto = (function (_super) {
            __extends(TrackingDeviceDto, _super);
            function TrackingDeviceDto() {
                _super.apply(this, arguments);
            }
            TrackingDeviceDto.prototype.default = function () {
                return {
                    id: "",
                    trackingNo: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return TrackingDeviceDto;
        })(Backbone.Model);
        Models.TrackingDeviceDto = TrackingDeviceDto;
        var TrackingDeviceCollection = (function (_super) {
            __extends(TrackingDeviceCollection, _super);
            function TrackingDeviceCollection(options) {
                this.model = TrackingDeviceDto;
                _super.call(this, options);
            }
            return TrackingDeviceCollection;
        })(Backbone.Collection);
        Models.TrackingDeviceCollection = TrackingDeviceCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=TrackingDeviceDto.js.map
