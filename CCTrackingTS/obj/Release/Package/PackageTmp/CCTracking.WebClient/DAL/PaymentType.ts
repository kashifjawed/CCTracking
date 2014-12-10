/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import paymentTypeDto = require("CCTracking.WebClient/Dtos/PaymentTypeDto");


export class PaymentTypeDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new paymentTypeDto.Models.PaymentTypeDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new PaymentTypeDal();
    return o.doAjaxRequest(null, "GET", "PaymentType");
}

export function Save(paymentTypeDto: paymentTypeDto.Models.PaymentTypeDto) {
    var o: baseDAL.BaseDto = new PaymentTypeDal();
    return o.doAjaxRequest(paymentTypeDto, "POST", "PaymentType");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new PaymentTypeDal();
    return o.doAjaxRequest(null, "GET", "PaymentType?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new PaymentTypeDal();
    return o.doAjaxRequest(null, "GET", "PaymentType?id=" + id);
}

//aaa


