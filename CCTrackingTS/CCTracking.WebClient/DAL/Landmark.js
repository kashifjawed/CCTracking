var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/LandmarkDto"], function(require, exports, baseDAL, landmarkDto) {
    var LandmarkDal = (function (_super) {
        __extends(LandmarkDal, _super);
        function LandmarkDal() {
            _super.call(this, this);
        }
        LandmarkDal.prototype.getResponse = function () {
            return new landmarkDto.Models.LandmarkDto();
        };
        return LandmarkDal;
    })(baseDAL.BaseDto);
    exports.LandmarkDal = LandmarkDal;

    function Load() {
        var o = new LandmarkDal();
        return o.doAjaxRequest(null, "GET", "Landmark");
    }
    exports.Load = Load;

    function Save(landmarkDto) {
        var o = new LandmarkDal();
        return o.doAjaxRequest(landmarkDto, "POST", "Landmark");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new LandmarkDal();
        return o.doAjaxRequest(null, "GET", "Landmark?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new LandmarkDal();
        return o.doAjaxRequest(null, "GET", "Landmark?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
