/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import driverDto = require("CCTracking.WebClient/Dtos/DriverDto");


export class DriverDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new driverDto.Models.DriverDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(null, "GET", "Driver");
}

export function Save(driverDto: driverDto.Models.DriverDto) {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(driverDto, "POST", "Driver");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(null, "GET", "Driver?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(null, "GET", "Driver?id=" + id);
}

export function GetAllSummary() {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(null, "GET", "DriverSummary");
}
export function GetAllDetail(id:number) {
    var o: baseDAL.BaseDto = new DriverDal();
    return o.doAjaxRequest(null, "GET", "DriverSummary?id=" + id);
}

//aaa


