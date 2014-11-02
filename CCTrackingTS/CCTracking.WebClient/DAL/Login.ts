
/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />


import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import loginDto = require("CCTracking.WebClient/Dtos/LoginDto");


export class LoginDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new loginDto.Models.LoginDto();
    }
}


export function Login(loginDto: loginDto.Models.LoginDto) {
    var o: baseDAL.BaseDto = new LoginDal();
    return o.doAjaxRequest(loginDto, "POST", "Login");
}


export function ChangePasswrd(loginDto: loginDto.Models.LoginDto) {
    var o: baseDAL.BaseDto = new LoginDal();
    return o.doAjaxRequest(loginDto, "POST", "ChangePassword");
}