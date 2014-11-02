/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import searchDto = require("CCTracking.WebClient/Dtos/SearchDto");


export class SearchDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new searchDto.Models.SearchDto();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new SearchDal();
    return o.doAjaxRequest(null, "GET", "Search");
}

export function Save(searchDto: searchDto.Models.SearchDto) {
    var o: baseDAL.BaseDto = new SearchDal();
    return o.doAjaxRequest(searchDto, "POST", "Search");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new SearchDal();
    return o.doAjaxRequest(null, "GET", "Search?a=a");
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new SearchDal();
    return o.doAjaxRequest(null, "GET", "Search?id=" + id);
}

export function GetByCriteria(searchDto: searchDto.Models.SearchDto) {
    var o: baseDAL.BaseDto = new SearchDal();
    return o.doAjaxRequest(searchDto, "POST", "Search");
}

//aaa

 