var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone", "marionette"], function(require, exports) {
    var ModalRegion = (function (_super) {
        __extends(ModalRegion, _super);
        function ModalRegion(options) {
            Marionette.Region.prototype.constructor.apply(this, arguments);

            this.ensureEl();
            this.$el.on('hidden', { region: this }, function (event) {
                event.data.region.close();
            });
            _super.call(this);
        }
        ModalRegion.prototype.onShow = function () {
            this.$el.modal('show');
        };
        ModalRegion.prototype.onClose = function () {
            this.$el.modal('hide');
        };
        return ModalRegion;
    })(Marionette.Region);
    exports.ModalRegion = ModalRegion;
});
