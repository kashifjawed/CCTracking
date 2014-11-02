/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!CCTracking.WebClient/Booking/Templates/BookingRight.html"/>
/// <amd-dependency path="marionette"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "text!CCTracking.WebClient/Booking/Templates/BookingRight.html", "marionette"], function(require, exports) {
    //var Marionette = require("marionette");
    var templateView = require("text!CCTracking.WebClient/Booking/Templates/BookingRight.html");

    var BusQuickSearchItemView = (function (_super) {
        __extends(BusQuickSearchItemView, _super);
        function BusQuickSearchItemView(options) {
            if (!options)
                options = {};
            options.template = templateView.getOuterHTML("#BookingRightPane");
            _super.call(this, options);
        }
        return BusQuickSearchItemView;
    })(Marionette.ItemView);
    exports.BusQuickSearchItemView = BusQuickSearchItemView;
});
//# sourceMappingURL=BookingRightView.js.map
