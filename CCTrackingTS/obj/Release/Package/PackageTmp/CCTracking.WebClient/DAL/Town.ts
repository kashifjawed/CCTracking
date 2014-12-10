/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import townDto = require("CCTracking.WebClient/Dtos/TownDto");


export class TownDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new townDto.Models.TownDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new TownDal();
    return o.doAjaxRequest(null, "GET", "Town");
}

export function Save(townDto: townDto.Models.TownDto) {
    var o: baseDAL.BaseDto = new TownDal();
    return o.doAjaxRequest(townDto, "POST", "Town");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new TownDal();
    return o.doAjaxRequest(null, "GET", "Town?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new TownDal();
    return o.doAjaxRequest(null, "GET", "Town?id=" + id);
}

//aaa


