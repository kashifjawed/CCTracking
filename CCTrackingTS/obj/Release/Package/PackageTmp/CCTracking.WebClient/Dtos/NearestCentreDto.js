var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    (function (Models) {
        var NearestCentreDto = (function (_super) {
            __extends(NearestCentreDto, _super);
            function NearestCentreDto() {
                _super.apply(this, arguments);
            }
            NearestCentreDto.prototype.default = function () {
                return {
                    centreId: "",
                    bookingId: "",
                    centreName: "",
                    busList: "",
                    address: "",
                    contactNo1: "",
                    contactNo2: "",
                    outTime: "",
                    returnTime: "",
                    busPoint: "",
                    graveyard: "",
                    masjidName: "",
                    namazEJanazaHeldIn: "",
                    namazEJanazLocation: "",
                    otherDetail: "",
                    vehicleNo: "",
                    centreAddress: "",
                    mobileNo: "",
                    fullName: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return NearestCentreDto;
        })(Backbone.Model);
        Models.NearestCentreDto = NearestCentreDto;
        var NearestCentreDtoCollection = (function (_super) {
            __extends(NearestCentreDtoCollection, _super);
            function NearestCentreDtoCollection(options) {
                this.model = NearestCentreDto;
                _super.call(this, options);
            }
            return NearestCentreDtoCollection;
        })(Backbone.Collection);
        Models.NearestCentreDtoCollection = NearestCentreDtoCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
