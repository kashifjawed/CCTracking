/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import busAvailabilityDto = require("CCTracking.WebClient/Dtos/BusAvailabilityDto");


export class BusAvailabilityDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new busAvailabilityDto.Models.BusAvailabilityDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new BusAvailabilityDal();
    return o.doAjaxRequest(null, "GET", "NearestCentre");
}

export function Save(stationDto: busAvailabilityDto.Models.BusAvailabilityDto) {
    var o: baseDAL.BaseDto = new BusAvailabilityDal();
    return o.doAjaxRequest(stationDto, "POST", "NearestCentre");
}

export function GetAll(id: number) {
    var o: baseDAL.BaseDto = new BusAvailabilityDal();
    return o.doAjaxRequest(null, "GET", "NearestCentre?idAll=" + id);
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new BusAvailabilityDal();
    return o.doAjaxRequest(null, "GET", "NearestCentre?id=" + id);
}
