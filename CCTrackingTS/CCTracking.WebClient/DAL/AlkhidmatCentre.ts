/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import alkhidmatCentreDto = require("CCTracking.WebClient/Dtos/AlkhidmatCentreDto");


export class StationDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new alkhidmatCentreDto.Models.StationDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new StationDal();
    return o.doAjaxRequest(null, "GET", "AlkhidmatCentre");
}

export function Save(stationDto: alkhidmatCentreDto.Models.StationDto) {
    var o: baseDAL.BaseDto = new StationDal();
    return o.doAjaxRequest(stationDto, "POST", "AlkhidmatCentre");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new StationDal();
    return o.doAjaxRequest(null, "GET", "AlkhidmatCentre?a=a");
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new StationDal();
    return o.doAjaxRequest(null, "GET", "AlkhidmatCentre?id=" + id);
}

//aaa

