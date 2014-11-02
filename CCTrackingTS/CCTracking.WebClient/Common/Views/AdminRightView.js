/// <reference path="../../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "text!CCTracking.WebClient/Common/Templates/AdminRight.html", "marionette"], function(require, exports) {
    /// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/AdminRight.html"/>
    /// <amd-dependency path="marionette"/>
    //var Marionette = require("marionette");
    var templateView = require("text!CCTracking.WebClient/Common/Templates/AdminRight.html");

    var AdminRightItemView = (function (_super) {
        __extends(AdminRightItemView, _super);
        function AdminRightItemView(options) {
            if (!options)
                options = {};
            options.template = templateView;
            _super.call(this, options);
        }
        return AdminRightItemView;
    })(Marionette.ItemView);
    exports.AdminRightItemView = AdminRightItemView;
});
//aaa
//# sourceMappingURL=AdminRightView.js.map
