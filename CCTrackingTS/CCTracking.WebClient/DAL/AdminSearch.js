/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/BookingSummaryDto", "jquery"], function(require, exports, baseDAL, searchDto) {
    var $ = require("jquery");

    var AdminSearchDal = (function (_super) {
        __extends(AdminSearchDal, _super);
        function AdminSearchDal() {
            _super.call(this, this);
        }
        AdminSearchDal.prototype.getResponse = function () {
            return new searchDto.Models.BookingSummaryDto();
        };
        return AdminSearchDal;
    })(baseDAL.BaseDto);
    exports.AdminSearchDal = AdminSearchDal;

    function Load() {
        var o = new AdminSearchDal();
        return o.doAjaxRequest(null, "GET", "BookingSummary");
    }
    exports.Load = Load;

    function Save(searchDto) {
        var o = new AdminSearchDal();
        return o.doAjaxRequest(searchDto, "POST", "BookingSummary");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new AdminSearchDal();
        return o.doAjaxRequest(null, "GET", "BookingSummary?a=a");
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new AdminSearchDal();
        return o.doAjaxRequest(null, "GET", "BookingSummary?id=" + id);
    }
    exports.GetById = GetById;

    function GetByCriteria(searchDto) {
        var o = new AdminSearchDal();
        return o.doAjaxRequest(searchDto, "POST", "BookingSummary");
    }
    exports.GetByCriteria = GetByCriteria;
});
//# sourceMappingURL=AdminSearch.js.map
