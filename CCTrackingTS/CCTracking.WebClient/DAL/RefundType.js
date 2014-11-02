var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/RefundTypeDto"], function(require, exports, baseDAL, refundTypeDto) {
    var RefundTypeDal = (function (_super) {
        __extends(RefundTypeDal, _super);
        function RefundTypeDal() {
            _super.call(this, this);
        }
        RefundTypeDal.prototype.getResponse = function () {
            return new refundTypeDto.Models.RefundTypeDto();
        };
        return RefundTypeDal;
    })(baseDAL.BaseDto);
    exports.RefundTypeDal = RefundTypeDal;

    function Load() {
        var o = new RefundTypeDal();
        return o.doAjaxRequest(null, "GET", "RefundType");
    }
    exports.Load = Load;

    function Save(refundTypeDto) {
        var o = new RefundTypeDal();
        return o.doAjaxRequest(refundTypeDto, "POST", "RefundType");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new RefundTypeDal();
        return o.doAjaxRequest(null, "GET", "RefundType?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new RefundTypeDal();
        return o.doAjaxRequest(null, "GET", "RefundType?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=RefundType.js.map
