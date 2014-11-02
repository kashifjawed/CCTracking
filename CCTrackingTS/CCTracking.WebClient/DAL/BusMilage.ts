/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import busMilageDto = require("CCTracking.WebClient/Dtos/BusMilageDto");


export class BusMilageDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new busMilageDto.Models.BusMilageDto();
    }
}


export function GetByCriteria(searchDto:any) {
    var o: baseDAL.BaseDto = new BusMilageDal();
    return o.doAjaxRequest(searchDto, "POST", "BusMilage" );
}