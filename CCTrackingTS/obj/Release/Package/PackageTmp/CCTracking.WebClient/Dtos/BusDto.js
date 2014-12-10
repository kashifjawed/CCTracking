var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone"], function(require, exports) {
    (function (Models) {
        var BusDto = (function (_super) {
            __extends(BusDto, _super);
            function BusDto() {
                _super.apply(this, arguments);
            }
            BusDto.prototype.default = function () {
                return {
                    id: "",
                    stationId: "",
                    trackingDeviceId: "",
                    vehicleNo: "",
                    no: "",
                    modelNo: "",
                    description: "",
                    initialReading: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return BusDto;
        })(Backbone.Model);
        Models.BusDto = BusDto;
        var BusCollection = (function (_super) {
            __extends(BusCollection, _super);
            function BusCollection(options) {
                this.model = BusDto;
                _super.call(this, options);
            }
            return BusCollection;
        })(Backbone.Collection);
        Models.BusCollection = BusCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
