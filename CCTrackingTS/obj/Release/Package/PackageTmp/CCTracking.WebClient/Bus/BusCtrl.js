var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../App", "../Helper", "./BusView", "../Dtos/BusDto", "marionette", "jquery", "knockout"], function(require, exports, application, helper, views, dto) {
    var app;
    var BusCtrl = (function (_super) {
        __extends(BusCtrl, _super);
        function BusCtrl() {
            app = application.Application.getInstance();
            _super.call(this);
        }
        BusCtrl.prototype.Show = function () {
            var model = new dto.Models.BusDto();
            this.busViewModel = new views.BusViewModel(model, this);
            this.busView = new views.BusView({ viewModel: this.busViewModel });
            app.AppLayout.DetailRegion.close();
            app.AppLayout.MainRegion.show(this.busView);
        };
        return BusCtrl;
    })(helper.Controller);
    exports.BusCtrl = BusCtrl;
});
