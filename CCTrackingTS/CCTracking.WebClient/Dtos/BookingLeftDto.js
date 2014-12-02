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
        var BookingLeftDto = (function (_super) {
            __extends(BookingLeftDto, _super);
            function BookingLeftDto() {
                _super.apply(this, arguments);
            }
            BookingLeftDto.prototype.default = function () {
                return {
                    officerId: "",
                    todaysBooking: "",
                    userTotalBooking: "",
                    userPiadBooking: "",
                    userUnpaidBooking: ""
                };
            };
            return BookingLeftDto;
        })(Backbone.Model);
        Models.BookingLeftDto = BookingLeftDto;
        var DriverCollection = (function (_super) {
            __extends(DriverCollection, _super);
            function DriverCollection(options) {
                this.model = BookingLeftDto;
                _super.call(this, options);
            }
            return DriverCollection;
        })(Backbone.Collection);
        Models.DriverCollection = DriverCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
