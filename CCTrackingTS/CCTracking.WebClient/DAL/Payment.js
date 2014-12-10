/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/PaymentDto", "jquery"], function(require, exports, baseDAL, paymentDto) {
    var $ = require("jquery");

    var PaymentDal = (function (_super) {
        __extends(PaymentDal, _super);
        function PaymentDal() {
            _super.call(this, this);
        }
        PaymentDal.prototype.getResponse = function () {
            return new paymentDto.Models.PaymentResponse();
        };
        return PaymentDal;
    })(baseDAL.BaseDto);
    exports.PaymentDal = PaymentDal;

    function Load() {
        var o = new PaymentDal();
        return o.doAjaxRequest(null, "GET", "Payment");
    }
    exports.Load = Load;

    function Save(bookingRequest) {
        var o = new PaymentDal();
        return o.doAjaxRequest(bookingRequest, "POST", "Payment");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new PaymentDal();
        return o.doAjaxRequest(null, "GET", "Payment?a=a");
    }
    exports.GetAll = GetAll;
    function GetById(id) {
        var o = new PaymentDal();
        return o.doAjaxRequest(null, "GET", "Payment?id=" + id);
    }
    exports.GetById = GetById;
    function GetBusAvialability(id) {
        var o = new PaymentDal();
        return o.doAjaxRequest(null, "GET", "BusAvailability?id=" + id);
    }
    exports.GetBusAvialability = GetBusAvialability;
    function GetAllAuditPayment(auditRequest) {
        var o = new PaymentDal();
        return o.doAjaxRequest(auditRequest, "POST", "AuditPayment");
    }
    exports.GetAllAuditPayment = GetAllAuditPayment;
});
//aaa
//# sourceMappingURL=Payment.js.map
