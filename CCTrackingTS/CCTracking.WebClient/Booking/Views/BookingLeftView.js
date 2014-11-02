/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Booking/Templates/BookingLeft.html"/>
/// <amd-dependency path="marionette"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "text!CCTracking.WebClient/Booking/Templates/BookingLeft.html", "marionette"], function(require, exports) {
    //var Marionette = require("marionette");
    var templateView = require("text!CCTracking.WebClient/Booking/Templates/BookingLeft.html");

    var BookingSummaryItemView = (function (_super) {
        __extends(BookingSummaryItemView, _super);
        function BookingSummaryItemView(options) {
            if (!options)
                options = {};
            options.template = templateView;
            _super.call(this, options);
            //aaa
        }
        return BookingSummaryItemView;
    })(Marionette.ItemView);
    exports.BookingSummaryItemView = BookingSummaryItemView;
});
//# sourceMappingURL=BookingLeftView.js.map
