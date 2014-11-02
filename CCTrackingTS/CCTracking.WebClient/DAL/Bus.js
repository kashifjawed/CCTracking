var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "../Dtos/BusDto"], function(require, exports, baseDAL, busDto) {
    var BusDal = (function (_super) {
        __extends(BusDal, _super);
        function BusDal() {
            _super.call(this, this);
        }
        BusDal.prototype.getResponse = function () {
            return new busDto.Models.BusDto();
        };
        return BusDal;
    })(baseDAL.BaseDto);
    exports.BusDal = BusDal;

    function Load() {
        var o = new BusDal();
        return o.doAjaxRequest(null, "GET", "Bus");
    }
    exports.Load = Load;

    function Save(busDto) {
        var o = new BusDal();
        return o.doAjaxRequest(busDto, "POST", "Bus");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new BusDal();
        return o.doAjaxRequest(null, "GET", "Bus?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new BusDal();
        return o.doAjaxRequest(null, "GET", "Bus?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=Bus.js.map
