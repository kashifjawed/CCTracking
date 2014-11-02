/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BusMilageDto", "jquery"], function(require, exports, baseDAL, busMilageDto) {
    var $ = require("jquery");

    var BusMilageDal = (function (_super) {
        __extends(BusMilageDal, _super);
        function BusMilageDal() {
            _super.call(this, this);
        }
        BusMilageDal.prototype.getResponse = function () {
            return new busMilageDto.Models.BusMilageDto();
        };
        return BusMilageDal;
    })(baseDAL.BaseDto);
    exports.BusMilageDal = BusMilageDal;

    function GetByCriteria(searchDto) {
        var o = new BusMilageDal();
        return o.doAjaxRequest(searchDto, "POST", "BusMilage");
    }
    exports.GetByCriteria = GetByCriteria;
});
