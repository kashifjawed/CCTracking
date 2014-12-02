var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/TrackingDeviceDto"], function(require, exports, baseDAL, trackingDeviceDto) {
    var TrackingDeviceDal = (function (_super) {
        __extends(TrackingDeviceDal, _super);
        function TrackingDeviceDal() {
            _super.call(this, this);
        }
        TrackingDeviceDal.prototype.getResponse = function () {
            return new trackingDeviceDto.Models.TrackingDeviceDto();
        };
        return TrackingDeviceDal;
    })(baseDAL.BaseDto);
    exports.TrackingDeviceDal = TrackingDeviceDal;

    function Load() {
        var o = new TrackingDeviceDal();
        return o.doAjaxRequest(null, "GET", "TrackingDevice");
    }
    exports.Load = Load;

    function Save(trackingDeviceDto) {
        var o = new TrackingDeviceDal();
        return o.doAjaxRequest(trackingDeviceDto, "POST", "TrackingDevice");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new TrackingDeviceDal();
        return o.doAjaxRequest(null, "GET", "TrackingDevice?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new TrackingDeviceDal();
        return o.doAjaxRequest(null, "GET", "TrackingDevice?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
