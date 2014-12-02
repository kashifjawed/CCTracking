var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BookingLeftDto"], function(require, exports, baseDAL, bookingLeftDto) {
    var BookingLeftDal = (function (_super) {
        __extends(BookingLeftDal, _super);
        function BookingLeftDal() {
            _super.call(this, this);
        }
        BookingLeftDal.prototype.getResponse = function () {
            return new bookingLeftDto.Models.BookingLeftDto();
        };
        return BookingLeftDal;
    })(baseDAL.BaseDto);
    exports.BookingLeftDal = BookingLeftDal;

    function GetByCriteria(bookingLeftDto) {
        var o = new BookingLeftDal();
        return o.doAjaxRequest(bookingLeftDto, "POST", "BookingLeft");
    }
    exports.GetByCriteria = GetByCriteria;
});
//aaa
