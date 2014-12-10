﻿/// <reference path="../../Scripts/typings/require/require.d.ts" />
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
        var BusVisitDto = (function (_super) {
            __extends(BusVisitDto, _super);
            function BusVisitDto() {
                _super.apply(this, arguments);
            }
            BusVisitDto.prototype.default = function () {
                return {
                    id: "",
                    centreId: "",
                    busId: "",
                    driverId: "",
                    visitTypeId: "",
                    bookingId: "",
                    inchargeName: "",
                    visitDate: "",
                    outTime: "",
                    returnTime: "",
                    readingWhenFilling: "",
                    pumpLocation: "",
                    fuelRate: "",
                    fuelAmount: "",
                    isBookingCompleted: "",
                    description: "",
                    initialReading: "",
                    finalReading: "",
                    isActive: "",
                    busDesc: "",
                    centreDesc: "",
                    driverDesc: "",
                    visitTypeDesc: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return BusVisitDto;
        })(Backbone.Model);
        Models.BusVisitDto = BusVisitDto;
        var BusVisitCollection = (function (_super) {
            __extends(BusVisitCollection, _super);
            function BusVisitCollection(options) {
                this.model = BusVisitDto;
                _super.call(this, options);
            }
            return BusVisitCollection;
        })(Backbone.Collection);
        Models.BusVisitCollection = BusVisitCollection;
        var BusVisitSummaryDto = (function (_super) {
            __extends(BusVisitSummaryDto, _super);
            function BusVisitSummaryDto() {
                _super.apply(this, arguments);
            }
            BusVisitSummaryDto.prototype.default = function () {
                return {
                    busId: "",
                    busDesc: "",
                    driverDesc: "",
                    centreDesc: "",
                    milage: "",
                    visitCount: "",
                    vehicleNo: "",
                    visitDate: "",
                    visitInterval: "",
                    bookingId: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return BusVisitSummaryDto;
        })(Backbone.Model);
        Models.BusVisitSummaryDto = BusVisitSummaryDto;
        var BusVisitSummaryCollection = (function (_super) {
            __extends(BusVisitSummaryCollection, _super);
            function BusVisitSummaryCollection(options) {
                this.model = BusVisitSummaryDto;
                _super.call(this, options);
            }
            return BusVisitSummaryCollection;
        })(Backbone.Collection);
        Models.BusVisitSummaryCollection = BusVisitSummaryCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=BusVisitDto.js.map
