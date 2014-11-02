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
        var BusAvailabilityDto = (function (_super) {
            __extends(BusAvailabilityDto, _super);
            function BusAvailabilityDto() {
                _super.apply(this, arguments);
            }
            BusAvailabilityDto.prototype.default = function () {
                return {
                    id: "",
                    centreId: "",
                    busId: "",
                    driverId: "",
                    visitTypeId: "",
                    bookingId: "",
                    isBookingCompleted: "",
                    description: "",
                    busDesc: "",
                    centreDesc: "",
                    driverDesc: "",
                    visitTypeDesc: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return BusAvailabilityDto;
        })(Backbone.Model);
        Models.BusAvailabilityDto = BusAvailabilityDto;
        var BusAvailabilityCollection = (function (_super) {
            __extends(BusAvailabilityCollection, _super);
            function BusAvailabilityCollection(options) {
                this.model = BusAvailabilityDto;
                _super.call(this, options);
            }
            return BusAvailabilityCollection;
        })(Backbone.Collection);
        Models.BusAvailabilityCollection = BusAvailabilityCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=BusAvailabilityDto.js.map
