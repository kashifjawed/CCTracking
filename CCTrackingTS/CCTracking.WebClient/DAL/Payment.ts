/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import paymentDto = require("CCTracking.WebClient/Dtos/PaymentDto");


export class PaymentDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new paymentDto.Models.PaymentResponse();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new PaymentDal();
    return o.doAjaxRequest(null, "GET", "Payment");
}

export function Save(bookingRequest: paymentDto.Models.PaymentRequest) {
    var o: baseDAL.BaseDto = new PaymentDal();
    return o.doAjaxRequest(bookingRequest, "POST", "Payment");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new PaymentDal();
    return o.doAjaxRequest(null, "GET", "Payment?a=a");
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new PaymentDal();
    return o.doAjaxRequest(null, "GET", "Payment?id=" + id);
}
export function GetBusAvialability(id) {
    var o: baseDAL.BaseDto = new PaymentDal();
    return o.doAjaxRequest(null, "GET", "BusAvailability?id=" + id);
}

//aaa

