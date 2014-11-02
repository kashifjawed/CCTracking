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
        var BookingSummaryDto = (function (_super) {
            __extends(BookingSummaryDto, _super);
            function BookingSummaryDto() {
                _super.apply(this, arguments);
            }
            BookingSummaryDto.prototype.default = function () {
                return {
                    alkhidmatCentre: "",
                    createdBy: "",
                    createdDate: "",
                    errorMessage: "",
                    id: "",
                    isActive: "",
                    modifiedBy: "",
                    modifiedDate: "",
                    paidAmount: "",
                    paidBooking: "",
                    unpaidAmount: "",
                    unpaidBooking: ""
                };
            };
            return BookingSummaryDto;
        })(Backbone.Model);
        Models.BookingSummaryDto = BookingSummaryDto;

        var BookingSummaryCollection = (function (_super) {
            __extends(BookingSummaryCollection, _super);
            function BookingSummaryCollection(options) {
                this.model = BookingSummaryDto;
                _super.call(this, options);
            }
            return BookingSummaryCollection;
        })(Backbone.Collection);
        Models.BookingSummaryCollection = BookingSummaryCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
//# sourceMappingURL=BookingSummaryDto.js.map
