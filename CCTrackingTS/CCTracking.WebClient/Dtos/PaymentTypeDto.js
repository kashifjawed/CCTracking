/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone"], function(require, exports) {
    (function (Models) {
        var PaymentTypeDto = (function (_super) {
            __extends(PaymentTypeDto, _super);
            function PaymentTypeDto() {
                _super.apply(this, arguments);
            }
            PaymentTypeDto.prototype.default = function () {
                return {
                    id: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return PaymentTypeDto;
        })(Backbone.Model);
        Models.PaymentTypeDto = PaymentTypeDto;
        var PaymentTypeCollection = (function (_super) {
            __extends(PaymentTypeCollection, _super);
            function PaymentTypeCollection(options) {
                this.model = PaymentTypeDto;
                _super.call(this, options);
            }
            return PaymentTypeCollection;
        })(Backbone.Collection);
        Models.PaymentTypeCollection = PaymentTypeCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=PaymentTypeDto.js.map
