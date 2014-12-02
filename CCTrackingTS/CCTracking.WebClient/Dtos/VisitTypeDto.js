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
        var VisitTypeDto = (function (_super) {
            __extends(VisitTypeDto, _super);
            function VisitTypeDto() {
                _super.apply(this, arguments);
            }
            VisitTypeDto.prototype.default = function () {
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
            return VisitTypeDto;
        })(Backbone.Model);
        Models.VisitTypeDto = VisitTypeDto;
        var VisitTypeCollection = (function (_super) {
            __extends(VisitTypeCollection, _super);
            function VisitTypeCollection(options) {
                this.model = VisitTypeDto;
                _super.call(this, options);
            }
            return VisitTypeCollection;
        })(Backbone.Collection);
        Models.VisitTypeCollection = VisitTypeCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
