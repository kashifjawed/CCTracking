var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/VisitTypeDto"], function(require, exports, baseDAL, visitTypeDto) {
    var VisitTypeDal = (function (_super) {
        __extends(VisitTypeDal, _super);
        function VisitTypeDal() {
            _super.call(this, this);
        }
        VisitTypeDal.prototype.getResponse = function () {
            return new visitTypeDto.Models.VisitTypeDto();
        };
        return VisitTypeDal;
    })(baseDAL.BaseDto);
    exports.VisitTypeDal = VisitTypeDal;

    function Load() {
        var o = new VisitTypeDal();
        return o.doAjaxRequest(null, "GET", "VisitType");
    }
    exports.Load = Load;

    function Save(visitTypeDto) {
        var o = new VisitTypeDal();
        return o.doAjaxRequest(visitTypeDto, "POST", "VisitType");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new VisitTypeDal();
        return o.doAjaxRequest(null, "GET", "VisitType?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new VisitTypeDal();
        return o.doAjaxRequest(null, "GET", "VisitType?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=VisitType.js.map
