var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../Helper", "knockout", "datatablesBootstrap", "text!CCTracking.WebClient/Bus/Bus.html", "text!CCTracking.WebClient/Bus/BusGrid.html"], function(require, exports, helper) {
    var busView = require("text!CCTracking.WebClient/Bus/Bus.html");
    var busGridView = require("text!CCTracking.WebClient/Bus/BusGrid.html");

    var BusViewModel = (function (_super) {
        __extends(BusViewModel, _super);
        function BusViewModel(model, controller) {
            _super.call(this, model, controller);
        }
        return BusViewModel;
    })(helper.ViewModel);
    exports.BusViewModel = BusViewModel;

    var BusView = (function (_super) {
        __extends(BusView, _super);
        function BusView(options) {
            this.template = busView.getOuterHTML("#BusTemplate");
            _super.call(this, options);
        }
        return BusView;
    })(helper.Views.MvvmView);
    exports.BusView = BusView;
});
