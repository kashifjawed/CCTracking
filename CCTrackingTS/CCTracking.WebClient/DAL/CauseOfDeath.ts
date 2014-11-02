/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import causeOfDeathDto = require("CCTracking.WebClient/Dtos/CauseOfDeathDto");


export class CauseOfDeathDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new causeOfDeathDto.Models.CauseOfDeathDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new CauseOfDeathDal();
    return o.doAjaxRequest(null, "GET", "CauseOfDeath");
}

export function Save(causeOfDeathDto: causeOfDeathDto.Models.CauseOfDeathDto) {
    var o: baseDAL.BaseDto = new CauseOfDeathDal();
    return o.doAjaxRequest(causeOfDeathDto, "POST", "CauseOfDeath");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new CauseOfDeathDal();
    return o.doAjaxRequest(null, "GET", "CauseOfDeath?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new CauseOfDeathDal();
    return o.doAjaxRequest(null, "GET", "CauseOfDeath?id=" + id);
}

//aaa


