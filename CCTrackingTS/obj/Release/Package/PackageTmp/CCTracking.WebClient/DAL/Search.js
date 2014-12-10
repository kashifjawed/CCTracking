var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/SearchDto", "jquery"], function(require, exports, baseDAL, searchDto) {
    var $ = require("jquery");

    var SearchDal = (function (_super) {
        __extends(SearchDal, _super);
        function SearchDal() {
            _super.call(this, this);
        }
        SearchDal.prototype.getResponse = function () {
            return new searchDto.Models.SearchDto();
        };
        return SearchDal;
    })(baseDAL.BaseDto);
    exports.SearchDal = SearchDal;

    function Load() {
        var o = new SearchDal();
        return o.doAjaxRequest(null, "GET", "Search");
    }
    exports.Load = Load;

    function Save(searchDto) {
        var o = new SearchDal();
        return o.doAjaxRequest(searchDto, "POST", "Search");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new SearchDal();
        return o.doAjaxRequest(null, "GET", "Search?a=a");
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new SearchDal();
        return o.doAjaxRequest(null, "GET", "Search?id=" + id);
    }
    exports.GetById = GetById;

    function GetByCriteria(searchDto) {
        var o = new SearchDal();
        return o.doAjaxRequest(searchDto, "POST", "Search");
    }
    exports.GetByCriteria = GetByCriteria;
});
