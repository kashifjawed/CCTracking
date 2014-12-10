/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/AlkhidmatCentreDto", "jquery"], function(require, exports, baseDAL, alkhidmatCentreDto) {
    var $ = require("jquery");

    var StationDal = (function (_super) {
        __extends(StationDal, _super);
        function StationDal() {
            _super.call(this, this);
        }
        StationDal.prototype.getResponse = function () {
            return new alkhidmatCentreDto.Models.StationDto();
        };
        return StationDal;
    })(baseDAL.BaseDto);
    exports.StationDal = StationDal;

    function Load() {
        var o = new StationDal();
        return o.doAjaxRequest(null, "GET", "AlkhidmatCentre");
    }
    exports.Load = Load;

    function Save(stationDto) {
        var o = new StationDal();
        return o.doAjaxRequest(stationDto, "POST", "AlkhidmatCentre");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new StationDal();
        return o.doAjaxRequest(null, "GET", "AlkhidmatCentre?a=a");
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new StationDal();
        return o.doAjaxRequest(null, "GET", "AlkhidmatCentre?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=AlkhidmatCentre.js.map
