var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BusAvailabilityDto", "jquery"], function(require, exports, baseDAL, busAvailabilityDto) {
    var $ = require("jquery");

    var BusAvailabilityDal = (function (_super) {
        __extends(BusAvailabilityDal, _super);
        function BusAvailabilityDal() {
            _super.call(this, this);
        }
        BusAvailabilityDal.prototype.getResponse = function () {
            return new busAvailabilityDto.Models.BusAvailabilityDto();
        };
        return BusAvailabilityDal;
    })(baseDAL.BaseDto);
    exports.BusAvailabilityDal = BusAvailabilityDal;

    function Load() {
        var o = new BusAvailabilityDal();
        return o.doAjaxRequest(null, "GET", "NearestCentre");
    }
    exports.Load = Load;

    function Save(stationDto) {
        var o = new BusAvailabilityDal();
        return o.doAjaxRequest(stationDto, "POST", "NearestCentre");
    }
    exports.Save = Save;

    function GetAll(id) {
        var o = new BusAvailabilityDal();
        return o.doAjaxRequest(null, "GET", "NearestCentre?idAll=" + id);
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new BusAvailabilityDal();
        return o.doAjaxRequest(null, "GET", "NearestCentre?id=" + id);
    }
    exports.GetById = GetById;
});
