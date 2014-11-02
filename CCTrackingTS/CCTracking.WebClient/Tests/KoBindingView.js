/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "../App", "marionette", "jquery", "knockout", "text!./KoBindingTmpl.html"], function(require, exports, helper, application) {
    /// <amd-dependency path="marionette"/>
    /// <amd-dependency path="jquery"/>
    /// <amd-dependency path="knockout"/>
    /// <amd-dependency path="text!./KoBindingTmpl.html"/>
    var _ = require('underscore');

    var ko = require("knockout");
    var kb = require("knockback");

    var templateView = require("text!./KoBindingTmpl.html");

    var app;

    //export class KoBindingViewModel extends helper.ViewModel {
    //    constructor(model: any, controller: any) {
    //        super(model, controller);
    //    }
    //}
    var KoBindingView = (function (_super) {
        __extends(KoBindingView, _super);
        function KoBindingView(options) {
            app = application.Application.getInstance();
            this.template = templateView;
            this.viewModel = new ViewModell();
            this.bbModel = new Backbone.Model();

            //this.bbModel = kb.viewModel(new Backbone.Model(this.viewModel));
            this.events = {
                "submit": "Save",
                "click .jsCancel": "Cancel"
            };
            _super.call(this, options);
        }
        KoBindingView.prototype.Save = function (e) {
            e.preventDefault();
            debugger;
            var a = this.viewModel.one();

            //this.bbModel = new Backbone.Model(this.viewModel);
            //var b = this.bbModel.get("one")();
            this.bbModel.set("one", this.viewModel.one());
            this.bbModel.set("two", this.viewModel.two());
            this.bbModel.set("sum", this.viewModel.sum());
            var b = this.bbModel;
        };

        KoBindingView.prototype.onShow = function () {
            ko.applyBindings(this.viewModel, this.el);
        };
        return KoBindingView;
    })(helper.Views.ItemView);
    exports.KoBindingView = KoBindingView;

    var ViewModell = (function () {
        //one: KnockoutObservable<string>;
        //two: KnockoutObservable<string>;
        //sum: KnockoutComputed<string>;
        function ViewModell() {
            var _this = this;
            this.one = ko.observable();
            this.two = ko.observable();
            this.sum = ko.computed({
                owner: this,
                read: function () {
                    if (_this.one() != undefined && _this.two() != undefined) {
                        return (parseInt(_this.one()) + parseInt(_this.two()));
                    } else {
                        return;
                    }
                }
            });
            //this.model = new Backbone.Model({});
        }
        return ViewModell;
    })();
    exports.ViewModell = ViewModell;
});
//# sourceMappingURL=KoBindingView.js.map
