/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import trackingDeviceDto = require("CCTracking.WebClient/Dtos/TrackingDeviceDto");


export class TrackingDeviceDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new trackingDeviceDto.Models.TrackingDeviceDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new TrackingDeviceDal();
    return o.doAjaxRequest(null, "GET", "TrackingDevice");
}

export function Save(trackingDeviceDto: trackingDeviceDto.Models.TrackingDeviceDto) {
    var o: baseDAL.BaseDto = new TrackingDeviceDal();
    return o.doAjaxRequest(trackingDeviceDto, "POST", "TrackingDevice");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new TrackingDeviceDal();
    return o.doAjaxRequest(null, "GET", "TrackingDevice?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new TrackingDeviceDal();
    return o.doAjaxRequest(null, "GET", "TrackingDevice?id=" + id);
}

//aaa


