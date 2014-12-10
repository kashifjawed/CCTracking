/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import dto = require("CCTracking.WebClient/Dtos/RefundBookingDto");


export class RefundBookingDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new dto.Models.RefundBookingDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new RefundBookingDal();
    return o.doAjaxRequest(null, "GET", "RefundBooking");
}

export function Save(stationDto: dto.Models.RefundBookingDto) {
    var o: baseDAL.BaseDto = new RefundBookingDal();
    return o.doAjaxRequest(stationDto, "POST", "RefundBooking");
}

//export function GetAll() {
//    var o: baseDAL.BaseDto = new CancelBookingDal();
//    return o.doAjaxRequest(null, "GET", "RefundBooking?a=a");
//}
export function GetById(id) {
    var o: baseDAL.BaseDto = new RefundBookingDal();
    return o.doAjaxRequest(null, "GET", "RefundBooking?id=" + id);
}
export function GetAllAuditRefundBooking(auditRequest) {
    var o: baseDAL.BaseDto = new RefundBookingDal();
    return o.doAjaxRequest(auditRequest, "POST", "AuditRefundBooking");
}
