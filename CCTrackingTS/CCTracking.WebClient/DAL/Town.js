var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/TownDto"], function(require, exports, baseDAL, townDto) {
    var TownDal = (function (_super) {
        __extends(TownDal, _super);
        function TownDal() {
            _super.call(this, this);
        }
        TownDal.prototype.getResponse = function () {
            return new townDto.Models.TownDto();
        };
        return TownDal;
    })(baseDAL.BaseDto);
    exports.TownDal = TownDal;

    function Load() {
        var o = new TownDal();
        return o.doAjaxRequest(null, "GET", "Town");
    }
    exports.Load = Load;

    function Save(townDto) {
        var o = new TownDal();
        return o.doAjaxRequest(townDto, "POST", "Town");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new TownDal();
        return o.doAjaxRequest(null, "GET", "Town?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new TownDal();
        return o.doAjaxRequest(null, "GET", "Town?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
