var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    (function (Models) {
        var SearchDto = (function (_super) {
            __extends(SearchDto, _super);
            function SearchDto() {
                _super.apply(this, arguments);
            }
            SearchDto.prototype.default = function () {
                return {
                    id: "",
                    name: "",
                    landmarkId: "",
                    address: "",
                    contactNo1: "",
                    contactNo2: "",
                    isCoPartner: "",
                    contactInfo: "",
                    deseasedInfo: "",
                    genderId: "",
                    paymentStatusId: "",
                    bookingDate: "",
                    greveyardId: "",
                    centreId: "",
                    busId: "",
                    isActive: "",
                    createdBy: "",
                    createdDate: "",
                    modifiedBy: "",
                    modifiedDate: ""
                };
            };
            return SearchDto;
        })(Backbone.Model);
        Models.SearchDto = SearchDto;

        var SearchCollection = (function (_super) {
            __extends(SearchCollection, _super);
            function SearchCollection(options) {
                this.model = SearchDto;
                _super.call(this, options);
            }
            return SearchCollection;
        })(Backbone.Collection);
        Models.SearchCollection = SearchCollection;
    })(exports.Models || (exports.Models = {}));
    var Models = exports.Models;
});
