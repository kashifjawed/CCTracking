/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./KoBindingView", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    var _ = require("underscore");
    var ko = require("knockout");
    var kb = require("knockback");

    //import dto = require("CCTracking.WebClient/Dtos/PaymentDto");
    //import busVisitDto = require("CCTracking.WebClient/Dtos/BusVisitDto");
    //import DAL = require("../DAL/Payment");
    var app;

    var KoBindingCtrl = (function (_super) {
        __extends(KoBindingCtrl, _super);
        function KoBindingCtrl() {
            app = application.Application.getInstance();
            _super.call(this);
        }
        KoBindingCtrl.prototype.Show = function () {
            var bbmodel = new Backbone.Model();
            bbmodel.set("one", 10);
            bbmodel.set("two", 20);
            bbmodel.set("sum", 30);

            this.koBindingView = new views.KoBindingView({ model: bbmodel });
            app.AppLayout.MainRegion.show(this.koBindingView);
        };
        return KoBindingCtrl;
    })(helper.Controller);
    exports.KoBindingCtrl = KoBindingCtrl;
});
//# sourceMappingURL=KoBindingCtrl.js.map
