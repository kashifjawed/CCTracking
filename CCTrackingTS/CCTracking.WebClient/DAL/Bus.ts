/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import busDto = require("../Dtos/BusDto");


export class BusDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new busDto.Models.BusDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new BusDal();
    return o.doAjaxRequest(null, "GET", "Bus");
}

export function Save(busDto: busDto.Models.BusDto) {
    var o: baseDAL.BaseDto = new BusDal();
    return o.doAjaxRequest(busDto, "POST", "Bus");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new BusDal();
    return o.doAjaxRequest(null, "GET", "Bus?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new BusDal();
    return o.doAjaxRequest(null, "GET", "Bus?id=" + id);
}

//aaa


