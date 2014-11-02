/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BookingDto", "jquery"], function(require, exports, baseDAL, bookingDto) {
    var $ = require("jquery");

    var BookingDal = (function (_super) {
        __extends(BookingDal, _super);
        function BookingDal() {
            _super.call(this, this);
        }
        BookingDal.prototype.getResponse = function () {
            return new bookingDto.Models.BookingResponse();
        };
        return BookingDal;
    })(baseDAL.BaseDto);
    exports.BookingDal = BookingDal;

    function Load() {
        var o = new BookingDal();
        return o.doAjaxRequest(null, "GET", "Booking");
    }
    exports.Load = Load;

    function Save(bookingRequest) {
        var o = new BookingDal();
        return o.doAjaxRequest(bookingRequest, "POST", "Booking");
    }
    exports.Save = Save;

    function GetAll(bookingFilterType) {
        var o = new BookingDal();
        return o.doAjaxRequest(null, "GET", "Booking?a=" + bookingFilterType);
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new BookingDal();
        return o.doAjaxRequest(null, "GET", "Booking?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=Booking.js.map
