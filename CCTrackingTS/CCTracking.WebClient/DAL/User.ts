/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import userDto = require("CCTracking.WebClient/Dtos/UserDto");


export class UserDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new userDto.Models.UserDto();
    }
}


export function Load() {
    var o: baseDAL.BaseDto = new UserDal();
    return o.doAjaxRequest(null, "GET", "User");
}

export function Save(userDto: userDto.Models.UserDto) {
    var o: baseDAL.BaseDto = new UserDal();
    return o.doAjaxRequest(userDto, "POST", "User");
}

export function GetAll() {
    var o: baseDAL.BaseDto = new UserDal();
    return o.doAjaxRequest(null, "GET", "User?a=a");
}

export function GetById(id) {
    var o: baseDAL.BaseDto = new UserDal();
    return o.doAjaxRequest(null, "GET", "User?id=" + id);
}


export function ResetUserPasswrd(user: any) {
    var o: baseDAL.BaseDto = new UserDal();
    return o.doAjaxRequest(user, "POST", "ResetPassword");
}
//aaa


