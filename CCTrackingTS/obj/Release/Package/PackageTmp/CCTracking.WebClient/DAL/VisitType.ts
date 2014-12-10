/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import visitTypeDto = require("CCTracking.WebClient/Dtos/VisitTypeDto");


export class VisitTypeDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new visitTypeDto.Models.VisitTypeDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new VisitTypeDal();
    return o.doAjaxRequest(null, "GET", "VisitType");
}

export function Save(visitTypeDto: visitTypeDto.Models.VisitTypeDto) {
    var o: baseDAL.BaseDto = new VisitTypeDal();
    return o.doAjaxRequest(visitTypeDto, "POST", "VisitType");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new VisitTypeDal();
    return o.doAjaxRequest(null, "GET", "VisitType?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new VisitTypeDal();
    return o.doAjaxRequest(null, "GET", "VisitType?id=" + id);
}

//aaa


