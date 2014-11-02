/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import refundTypeDto = require("CCTracking.WebClient/Dtos/RefundTypeDto");


export class RefundTypeDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new refundTypeDto.Models.RefundTypeDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new RefundTypeDal();
    return o.doAjaxRequest(null, "GET", "RefundType");
}

export function Save(refundTypeDto: refundTypeDto.Models.RefundTypeDto) {
    var o: baseDAL.BaseDto = new RefundTypeDal();
    return o.doAjaxRequest(refundTypeDto, "POST", "RefundType");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new RefundTypeDal();
    return o.doAjaxRequest(null, "GET", "RefundType?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new RefundTypeDal();
    return o.doAjaxRequest(null, "GET", "RefundType?id=" + id);
}

//aaa


