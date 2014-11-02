/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import unionCouncilDto = require("CCTracking.WebClient/Dtos/UnionCouncilDto");


export class UnionCouncilDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new unionCouncilDto.Models.UnionCouncilDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new UnionCouncilDal();
    return o.doAjaxRequest(null, "GET", "UnionCouncil");
}

export function Save(unionCouncilDto: unionCouncilDto.Models.UnionCouncilDto) {
    var o: baseDAL.BaseDto = new UnionCouncilDal();
    return o.doAjaxRequest(unionCouncilDto, "POST", "UnionCouncil");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new UnionCouncilDal();
    return o.doAjaxRequest(null, "GET", "UnionCouncil?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new UnionCouncilDal();
    return o.doAjaxRequest(null, "GET", "UnionCouncil?id=" + id);
}

//aaa


