/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import landmarkDto = require("CCTracking.WebClient/Dtos/LandmarkDto");


export class LandmarkDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new landmarkDto.Models.LandmarkDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new LandmarkDal();
    return o.doAjaxRequest(null, "GET", "Landmark");
}

export function Save(landmarkDto: landmarkDto.Models.LandmarkDto) {
    var o: baseDAL.BaseDto = new LandmarkDal();
    return o.doAjaxRequest(landmarkDto, "POST", "Landmark");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new LandmarkDal();
    return o.doAjaxRequest(null, "GET", "Landmark?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new LandmarkDal();
    return o.doAjaxRequest(null, "GET", "Landmark?id=" + id);
}

//aaa


