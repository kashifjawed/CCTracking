/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="knockout"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./HomeView", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views) {
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    //import dto = require("CCTracking.WebClient/Dtos/SearchDto");
    //import DAL = require("../DAL/Search");
    var HomeCtrl = (function (_super) {
        __extends(HomeCtrl, _super);
        function HomeCtrl() {
            _super.call(this);
            this.app = application.Application.getInstance();
            this.homeItemView = new views.HomeItemView();
        }
        HomeCtrl.prototype.Show = function () {
            this.app.MainRegion.show(this.homeItemView);
        };
        return HomeCtrl;
    })(helper.Controller);
    exports.HomeCtrl = HomeCtrl;
});
//# sourceMappingURL=HomeCtrl.js.map
