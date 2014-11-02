var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/UserDto"], function(require, exports, baseDAL, userDto) {
    var UserDal = (function (_super) {
        __extends(UserDal, _super);
        function UserDal() {
            _super.call(this, this);
        }
        UserDal.prototype.getResponse = function () {
            return new userDto.Models.UserDto();
        };
        return UserDal;
    })(baseDAL.BaseDto);
    exports.UserDal = UserDal;

    function Load() {
        var o = new UserDal();
        return o.doAjaxRequest(null, "GET", "User");
    }
    exports.Load = Load;

    function Save(userDto) {
        var o = new UserDal();
        return o.doAjaxRequest(userDto, "POST", "User");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new UserDal();
        return o.doAjaxRequest(null, "GET", "User?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new UserDal();
        return o.doAjaxRequest(null, "GET", "User?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=User.js.map
