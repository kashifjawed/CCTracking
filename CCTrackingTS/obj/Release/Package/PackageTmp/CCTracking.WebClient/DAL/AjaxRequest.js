var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "jquery", "backbone"], function(require, exports) {
    var BaseDto = (function (_super) {
        __extends(BaseDto, _super);
        function BaseDto(request) {
            _super.call(this);
            this.ajaxRequest = request;
        }
        BaseDto.prototype.doAjaxRequest = function (request, requestType, actionUrl) {
            var _this = this;
            var webApiUrl = 'http://localhost/CCTracking.Api/api/' + actionUrl;

            var deferred = $.Deferred();
            var postData = null;
            if (request != null) {
                postData = request.toJSON();
            }
            $.ajax({
                type: requestType,
                datatype: 'json',
                url: webApiUrl,
                data: postData
            }).done(function (loginResponse) {
                var response = loginResponse;
                if (loginResponse == undefined) {
                    deferred.resolve(null);
                } else {
                    response = _this.ajaxRequest.getResponse();
                    response = loginResponse;
                }
                deferred.resolve(response);
            }).fail(function (e) {
                var response = _this.ajaxRequest.getResponse();
                response.AuthenticationErrorMessage = e.responseText.toString();
                deferred.resolve(response);
            });
            return deferred.promise();
        };
        return BaseDto;
    })(Backbone.Model);
    exports.BaseDto = BaseDto;
});
