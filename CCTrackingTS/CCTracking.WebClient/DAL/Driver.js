var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/DriverDto"], function(require, exports, baseDAL, driverDto) {
    var DriverDal = (function (_super) {
        __extends(DriverDal, _super);
        function DriverDal() {
            _super.call(this, this);
        }
        DriverDal.prototype.getResponse = function () {
            return new driverDto.Models.DriverDto();
        };
        return DriverDal;
    })(baseDAL.BaseDto);
    exports.DriverDal = DriverDal;

    function Load() {
        var o = new DriverDal();
        return o.doAjaxRequest(null, "GET", "Driver");
    }
    exports.Load = Load;

    function Save(driverDto) {
        var o = new DriverDal();
        return o.doAjaxRequest(driverDto, "POST", "Driver");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new DriverDal();
        return o.doAjaxRequest(null, "GET", "Driver?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new DriverDal();
        return o.doAjaxRequest(null, "GET", "Driver?id=" + id);
    }
    exports.GetById = GetById;

    function GetAllSummary() {
        var o = new DriverDal();
        return o.doAjaxRequest(null, "GET", "DriverSummary");
    }
    exports.GetAllSummary = GetAllSummary;
    function GetAllDetail(id) {
        var o = new DriverDal();
        return o.doAjaxRequest(null, "GET", "DriverSummary?id=" + id);
    }
    exports.GetAllDetail = GetAllDetail;
});
//aaa
//# sourceMappingURL=Driver.js.map
