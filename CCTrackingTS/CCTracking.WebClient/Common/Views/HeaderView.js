var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../../App", "marionette", "text!CCTracking.WebClient/Common/Templates/Header.html"], function(require, exports, application) {
    /// <reference path="../../../Scripts/typings/require/require.d.ts" />
    /// <reference path="../../../Scripts/typings/marionette/marionette.d.ts" />
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="text!CCTracking.WebClient/Common/Templates/Header.html"/>
    var templateView = require("text!CCTracking.WebClient/Common/Templates/Header.html");

    var app;
    var HeaderItemView = (function (_super) {
        __extends(HeaderItemView, _super);
        function HeaderItemView(options) {
            if (!options)
                options = {};
            app = application.Application.getInstance();
            options.template = templateView.getOuterHTML("#SiteHeader");
            this.templateHelpers = function () {
                return {
                    isAdminRole: function () {
                        return app.request("AppGlobalSetting").get("IsAdmin");
                    }
                };
            };
            _super.call(this, options);
        }
        return HeaderItemView;
    })(Marionette.ItemView);
    exports.HeaderItemView = HeaderItemView;
});
