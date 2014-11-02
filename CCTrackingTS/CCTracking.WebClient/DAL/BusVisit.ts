/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import busVisitDto = require("CCTracking.WebClient/Dtos/BusVisitDto");


export class BusVisitDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new busVisitDto.Models.BusVisitDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new BusVisitDal();
    return o.doAjaxRequest(null, "GET", "BusVisit");
}

export function Save(stationDto: busVisitDto.Models.BusVisitDto) {
    var o: baseDAL.BaseDto = new BusVisitDal();
    return o.doAjaxRequest(stationDto, "POST", "BusVisit");
}

export function GetAll(id:number) {
    var o: baseDAL.BaseDto = new BusVisitDal();
    return o.doAjaxRequest(null, "GET", "BusVisit?idAll=" + id);
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new BusVisitDal();
    return o.doAjaxRequest(null, "GET", "BusVisit?id=" + id);
}
