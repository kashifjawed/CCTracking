var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/UnionCouncilDto"], function(require, exports, baseDAL, unionCouncilDto) {
    var UnionCouncilDal = (function (_super) {
        __extends(UnionCouncilDal, _super);
        function UnionCouncilDal() {
            _super.call(this, this);
        }
        UnionCouncilDal.prototype.getResponse = function () {
            return new unionCouncilDto.Models.UnionCouncilDto();
        };
        return UnionCouncilDal;
    })(baseDAL.BaseDto);
    exports.UnionCouncilDal = UnionCouncilDal;

    function Load() {
        var o = new UnionCouncilDal();
        return o.doAjaxRequest(null, "GET", "UnionCouncil");
    }
    exports.Load = Load;

    function Save(unionCouncilDto) {
        var o = new UnionCouncilDal();
        return o.doAjaxRequest(unionCouncilDto, "POST", "UnionCouncil");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new UnionCouncilDal();
        return o.doAjaxRequest(null, "GET", "UnionCouncil?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new UnionCouncilDal();
        return o.doAjaxRequest(null, "GET", "UnionCouncil?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
