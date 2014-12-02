/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="backbone"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "backbone"], function(require, exports) {
    (function (Models) {
        var RefundTypeDto = (function (_super) {
            __extends(RefundTypeDto, _super);
            function RefundTypeDto() {
                _super.apply(this, arguments);
            }
            RefundTypeDto.prototype.default = function () {
                return {
                    id: "",
                    name: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return RefundTypeDto;
        })(Backbone.Model);
        Models.RefundTypeDto = RefundTypeDto;
        var RefundTypeCollection = (function (_super) {
            __extends(RefundTypeCollection, _super);
            function RefundTypeCollection(options) {
                this.model = RefundTypeDto;
                _super.call(this, options);
            }
            return RefundTypeCollection;
        })(Backbone.Collection);
        Models.RefundTypeCollection = RefundTypeCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
