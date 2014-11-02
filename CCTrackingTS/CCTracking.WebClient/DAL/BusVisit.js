/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BusVisitDto", "jquery"], function(require, exports, baseDAL, busVisitDto) {
    var $ = require("jquery");

    var BusVisitDal = (function (_super) {
        __extends(BusVisitDal, _super);
        function BusVisitDal() {
            _super.call(this, this);
        }
        BusVisitDal.prototype.getResponse = function () {
            return new busVisitDto.Models.BusVisitDto();
        };
        return BusVisitDal;
    })(baseDAL.BaseDto);
    exports.BusVisitDal = BusVisitDal;

    function Load() {
        var o = new BusVisitDal();
        return o.doAjaxRequest(null, "GET", "BusVisit");
    }
    exports.Load = Load;

    function Save(stationDto) {
        var o = new BusVisitDal();
        return o.doAjaxRequest(stationDto, "POST", "BusVisit");
    }
    exports.Save = Save;

    function GetAll(id) {
        var o = new BusVisitDal();
        return o.doAjaxRequest(null, "GET", "BusVisit?idAll=" + id);
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new BusVisitDal();
        return o.doAjaxRequest(null, "GET", "BusVisit?id=" + id);
    }
    exports.GetById = GetById;
});
//# sourceMappingURL=BusVisit.js.map
