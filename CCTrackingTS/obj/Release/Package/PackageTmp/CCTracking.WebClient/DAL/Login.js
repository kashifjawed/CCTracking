var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/LoginDto"], function(require, exports, baseDAL, loginDto) {
    var LoginDal = (function (_super) {
        __extends(LoginDal, _super);
        function LoginDal() {
            _super.call(this, this);
        }
        LoginDal.prototype.getResponse = function () {
            return new loginDto.Models.LoginDto();
        };
        return LoginDal;
    })(baseDAL.BaseDto);
    exports.LoginDal = LoginDal;

    function Login(loginDto) {
        var o = new LoginDal();
        return o.doAjaxRequest(loginDto, "POST", "Login");
    }
    exports.Login = Login;

    function ChangePasswrd(loginDto) {
        var o = new LoginDal();
        return o.doAjaxRequest(loginDto, "POST", "ChangePassword");
    }
    exports.ChangePasswrd = ChangePasswrd;
});
