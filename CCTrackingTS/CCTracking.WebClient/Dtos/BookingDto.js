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
        var BookingRequest = (function (_super) {
            __extends(BookingRequest, _super);
            function BookingRequest() {
                _super.apply(this, arguments);
            }
            BookingRequest.prototype.default = function () {
                return {
                    id: "",
                    contactName: "",
                    contactMobile: "",
                    contactNic: "",
                    deseasedName: "",
                    deseasedAge: "",
                    deseasedGender: "",
                    causeOfDeath: "",
                    causeOfDeathSelected: "",
                    address: "",
                    busPoint: "",
                    unionCouncil: "",
                    town: "",
                    pickupDate: "",
                    pickupTime: "",
                    returnTime: "",
                    graveyard: "",
                    namazEJanazaHeldIn: "",
                    namazEJanazaLocation: "",
                    masjidName: "",
                    otherDetail: ""
                };
            };
            return BookingRequest;
        })(Backbone.Model);
        Models.BookingRequest = BookingRequest;

        var BookingResponse = (function (_super) {
            __extends(BookingResponse, _super);
            function BookingResponse() {
                _super.apply(this, arguments);
            }
            BookingResponse.prototype.default = function () {
                return {
                    id: "",
                    contactName: "",
                    contactMobile: "",
                    contactNic: "",
                    deseasedName: "",
                    deseasedAge: "",
                    deseasedGender: "",
                    causeOfDeath: "",
                    address: "",
                    busPoint: "",
                    landmarkId: "",
                    unionCouncilId: "",
                    townId: "",
                    pickupDate: "",
                    pickupTime: "",
                    returnTime: "",
                    graveyard: "",
                    namazEJanazaHeldIn: "",
                    namazEJanazaLocation: "",
                    masjidName: "",
                    otherDetail: ""
                };
            };
            return BookingResponse;
        })(Backbone.Model);
        Models.BookingResponse = BookingResponse;

        var AuditBooking = (function (_super) {
            __extends(AuditBooking, _super);
            function AuditBooking() {
                _super.apply(this, arguments);
            }
            AuditBooking.prototype.default = function () {
                return {
                    id: "",
                    bookingId: "",
                    propertyName: "",
                    oldValue: "",
                    newValue: "",
                    modifiedDate: "",
                    createdDate: "",
                    actualModifiedDate: "",
                    userName: ""
                };
            };
            return AuditBooking;
        })(Backbone.Model);
        Models.AuditBooking = AuditBooking;

        var BookingResponseCollection = (function (_super) {
            __extends(BookingResponseCollection, _super);
            function BookingResponseCollection(options) {
                this.model = BookingResponse;
                _super.call(this, options);
            }
            return BookingResponseCollection;
        })(Backbone.Collection);
        Models.BookingResponseCollection = BookingResponseCollection;
        var AuditBookingResponseCollection = (function (_super) {
            __extends(AuditBookingResponseCollection, _super);
            function AuditBookingResponseCollection(options) {
                this.model = AuditBooking;
                _super.call(this, options);
            }
            return AuditBookingResponseCollection;
        })(Backbone.Collection);
        Models.AuditBookingResponseCollection = AuditBookingResponseCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=BookingDto.js.map
