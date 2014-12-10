var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/GraveyardDto"], function(require, exports, baseDAL, graveyardDto) {
    var GraveyardDal = (function (_super) {
        __extends(GraveyardDal, _super);
        function GraveyardDal() {
            _super.call(this, this);
        }
        GraveyardDal.prototype.getResponse = function () {
            return new graveyardDto.Models.GraveyardDto();
        };
        return GraveyardDal;
    })(baseDAL.BaseDto);
    exports.GraveyardDal = GraveyardDal;

    function Load() {
        var o = new GraveyardDal();
        return o.doAjaxRequest(null, "GET", "Graveyard");
    }
    exports.Load = Load;

    function Save(graveyardDto) {
        var o = new GraveyardDal();
        return o.doAjaxRequest(graveyardDto, "POST", "Graveyard");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new GraveyardDal();
        return o.doAjaxRequest(null, "GET", "Graveyard?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new GraveyardDal();
        return o.doAjaxRequest(null, "GET", "Graveyard?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
//# sourceMappingURL=Graveyard.js.map
