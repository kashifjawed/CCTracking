/// <reference path="../Scripts/typings/require/require.d.ts" />
/// <reference path="../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>
/// <amd-dependency path="marionette"/>

//export function GetModalRegion() {
//    var ModalRegion = Marionette.Region.extend({
//        constructor: function () {
//            Marionette.Region.prototype.constructor.apply(this, arguments);

//            this.ensureEl();
//            this.$el.on('hidden', { region: this }, function (event) {
//                event.data.region.close();
//            });
//        },

//        onShow: function () {
//            this.$el.modal('show');
//        },

//        onClose: function () {
//            this.$el.modal('hide');
//        }
//    });
//    return ModalRegion;
//}

export class ModalRegion  extends Marionette.Region{
    constructor(options) {
        Marionette.Region.prototype.constructor.apply(this, arguments);

        this.ensureEl();
        this.$el.on('hidden', { region: this }, function (event) {
            event.data.region.close();
        });
        super();
    }
    onShow() {
        this.$el.modal('show');
    }
    onClose() {
        this.$el.modal('hide');
    }
}