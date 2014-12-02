var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/CauseOfDeathDto"], function(require, exports, baseDAL, causeOfDeathDto) {
    var CauseOfDeathDal = (function (_super) {
        __extends(CauseOfDeathDal, _super);
        function CauseOfDeathDal() {
            _super.call(this, this);
        }
        CauseOfDeathDal.prototype.getResponse = function () {
            return new causeOfDeathDto.Models.CauseOfDeathDto();
        };
        return CauseOfDeathDal;
    })(baseDAL.BaseDto);
    exports.CauseOfDeathDal = CauseOfDeathDal;

    function Load() {
        var o = new CauseOfDeathDal();
        return o.doAjaxRequest(null, "GET", "CauseOfDeath");
    }
    exports.Load = Load;

    function Save(causeOfDeathDto) {
        var o = new CauseOfDeathDal();
        return o.doAjaxRequest(causeOfDeathDto, "POST", "CauseOfDeath");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new CauseOfDeathDal();
        return o.doAjaxRequest(null, "GET", "CauseOfDeath?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new CauseOfDeathDal();
        return o.doAjaxRequest(null, "GET", "CauseOfDeath?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
