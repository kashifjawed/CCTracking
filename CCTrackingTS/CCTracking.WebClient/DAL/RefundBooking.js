/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/RefundBookingDto", "jquery"], function(require, exports, baseDAL, dto) {
    var $ = require("jquery");

    var RefundBookingDal = (function (_super) {
        __extends(RefundBookingDal, _super);
        function RefundBookingDal() {
            _super.call(this, this);
        }
        RefundBookingDal.prototype.getResponse = function () {
            return new dto.Models.RefundBookingDto();
        };
        return RefundBookingDal;
    })(baseDAL.BaseDto);
    exports.RefundBookingDal = RefundBookingDal;

    function Load() {
        var o = new RefundBookingDal();
        return o.doAjaxRequest(null, "GET", "RefundBooking");
    }
    exports.Load = Load;

    function Save(stationDto) {
        var o = new RefundBookingDal();
        return o.doAjaxRequest(stationDto, "POST", "RefundBooking");
    }
    exports.Save = Save;

    //export function GetAll() {
    //    var o: baseDAL.BaseDto = new CancelBookingDal();
    //    return o.doAjaxRequest(null, "GET", "RefundBooking?a=a");
    //}
    function GetById(id) {
        var o = new RefundBookingDal();
        return o.doAjaxRequest(null, "GET", "RefundBooking?id=" + id);
    }
    exports.GetById = GetById;
});
//# sourceMappingURL=RefundBooking.js.map
