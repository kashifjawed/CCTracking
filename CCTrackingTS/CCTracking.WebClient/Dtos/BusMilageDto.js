/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="backbone"/>
    (function (Models) {
        var BusMilageDto = (function (_super) {
            __extends(BusMilageDto, _super);
            function BusMilageDto() {
                _super.apply(this, arguments);
            }
            BusMilageDto.prototype.default = function () {
                return {
                    id: "",
                    centreId: "",
                    busId: "",
                    visitTypeId: "",
                    isActive: "",
                    vehicleNo: "",
                    centreDesc: "",
                    visitTypeDesc: "",
                    TotalMilage: "",
                    TotalVisits: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return BusMilageDto;
        })(Backbone.Model);
        Models.BusMilageDto = BusMilageDto;
        var BusMilageCollection = (function (_super) {
            __extends(BusMilageCollection, _super);
            function BusMilageCollection(options) {
                this.model = BusMilageDto;
                _super.call(this, options);
            }
            return BusMilageCollection;
        })(Backbone.Collection);
        Models.BusMilageCollection = BusMilageCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
