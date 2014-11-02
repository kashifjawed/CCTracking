/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import graveyardDto = require("CCTracking.WebClient/Dtos/GraveyardDto");


export class GraveyardDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new graveyardDto.Models.GraveyardDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new GraveyardDal();
    return o.doAjaxRequest(null, "GET", "Graveyard");
}

export function Save(graveyardDto: graveyardDto.Models.GraveyardDto) {
    var o: baseDAL.BaseDto = new GraveyardDal();
    return o.doAjaxRequest(graveyardDto, "POST", "Graveyard");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new GraveyardDal();
    return o.doAjaxRequest(null, "GET", "Graveyard?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new GraveyardDal();
    return o.doAjaxRequest(null, "GET", "Graveyard?id=" + id);
}

//aaa


