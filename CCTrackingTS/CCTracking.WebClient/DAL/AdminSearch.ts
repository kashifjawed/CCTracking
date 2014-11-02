/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import searchDto = require("CCTracking.WebClient/Dtos/BookingSummaryDto");

export class AdminSearchDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new searchDto.Models.BookingSummaryDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new AdminSearchDal();
    return o.doAjaxRequest(null, "GET", "BookingSummary");
}

export function Save(searchDto: searchDto.Models.BookingSummaryDto) {
    var o: baseDAL.BaseDto = new AdminSearchDal();
    return o.doAjaxRequest(searchDto, "POST", "BookingSummary");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new AdminSearchDal();
    return o.doAjaxRequest(null, "GET", "BookingSummary?a=a");
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new AdminSearchDal();
    return o.doAjaxRequest(null, "GET", "BookingSummary?id=" + id);
}

export function GetByCriteria(searchDto: searchDto.Models.BookingSummaryDto) {
    var o: baseDAL.BaseDto = new AdminSearchDal();
    return o.doAjaxRequest(searchDto, "POST", "BookingSummary");
}



