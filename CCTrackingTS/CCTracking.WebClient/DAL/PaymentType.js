var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "CCTracking.WebClient/DAL/AjaxRequest", "CCTracking.WebClient/Dtos/PaymentTypeDto"], function(require, exports, baseDAL, paymentTypeDto) {
    var PaymentTypeDal = (function (_super) {
        __extends(PaymentTypeDal, _super);
        function PaymentTypeDal() {
            _super.call(this, this);
        }
        PaymentTypeDal.prototype.getResponse = function () {
            return new paymentTypeDto.Models.PaymentTypeDto();
        };
        return PaymentTypeDal;
    })(baseDAL.BaseDto);
    exports.PaymentTypeDal = PaymentTypeDal;

    function Load() {
        var o = new PaymentTypeDal();
        return o.doAjaxRequest(null, "GET", "PaymentType");
    }
    exports.Load = Load;

    function Save(paymentTypeDto) {
        var o = new PaymentTypeDal();
        return o.doAjaxRequest(paymentTypeDto, "POST", "PaymentType");
    }
    exports.Save = Save;

    function GetAll() {
        var o = new PaymentTypeDal();
        return o.doAjaxRequest(null, "GET", "PaymentType?a=a");
    }
    exports.GetAll = GetAll;

    function GetById(id) {
        var o = new PaymentTypeDal();
        return o.doAjaxRequest(null, "GET", "PaymentType?id=" + id);
    }
    exports.GetById = GetById;
});
//aaa
