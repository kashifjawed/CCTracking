/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="jquery"/>
/// <amd-dependency path="jqueryUI"/>
/// <amd-dependency path="knockout"/>
/// <amd-dependency path="text!./Home.html"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "marionette", "jquery", "jqueryUI", "knockout", "text!./Home.html"], function(require, exports, helper) {
    var _ = require('underscore');

    var templateView = require("text!./Home.html");

    var app;

    var HomeItemView = (function (_super) {
        __extends(HomeItemView, _super);
        //viewModel: ViewModel;
        //bbModel: Backbone.Model;
        function HomeItemView(options) {
            this.template = templateView;

            //this.viewModel = new ViewModel(options);
            //this.bbModel = new Backbone.Model();
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        return HomeItemView;
    })(helper.Views.ItemView);
    exports.HomeItemView = HomeItemView;
});
//# sourceMappingURL=HomeView.js.map
