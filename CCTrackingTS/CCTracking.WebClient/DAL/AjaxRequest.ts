/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <reference path="../../Scripts/typings/backbone/backbone.d.ts" />

/// <amd-dependency path="jquery"/>
/// <amd-dependency path="backbone"/>
//var $ = require("jquery");

export class BaseDto extends Backbone.Model {
    private ajaxRequest: IBaseDto;
    constructor(request: IBaseDto) {
        super();
        this.ajaxRequest = request;
    }
    doAjaxRequest(request: any, requestType: string, actionUrl: string) {
        //alert(this.ajaxRequest.getResponse());        
        var webApiUrl = '/CCTracking.Api/api/' + actionUrl;

        var deferred =$.Deferred();
        var postData = null;
        if (request != null) {
            postData = request.toJSON();
        }
        $.ajax({
            type: requestType,
            datatype: 'json',
            url: webApiUrl,
            //data: { userName: loginRequest.get("userName"), password: loginRequest.get("password") }
            data: postData
        })
            .done(loginResponse=> {                
                var response = loginResponse;
                if (loginResponse == undefined) {
                    deferred.resolve(null);
                }
                else {
                    response = this.ajaxRequest.getResponse();
                    response = loginResponse;
                }
                deferred.resolve(response);
            })
            .fail(e=> {
                var response = this.ajaxRequest.getResponse();
                response.AuthenticationErrorMessage = e.responseText.toString();                
                deferred.resolve(response);
            });
        return deferred.promise();
    }

    //doAjaxRequest1(request: any, requestType: string, actionUrl: string) {
    //    //alert(this.ajaxRequest.getResponse());        
    //    var webApiUrl = 'http://localhost/CCTracking.Api/api/' + actionUrl;

    //    var deferred = $.Deferred();
    //    var postData = null;
    //    if (request != null) {
    //        postData = request.toJSON();
    //    }
    //    $.ajax({
    //        type: requestType,
    //        datatype: 'json',
    //        url: webApiUrl,
    //        //data: { userName: loginRequest.get("userName"), password: loginRequest.get("password") }
    //        data: postData
    //    })
    //        .done(loginResponse=> {

    //            var response = loginResponse;
    //            if (loginResponse == undefined) {
    //                deferred.resolve(null);
    //            }
    //            else {
    //                response = this.ajaxRequest.getResponse();
    //                response = loginResponse;
    //            }
    //            deferred.resolve(response);
    //        })
    //        .fail(e=> {

    //            var response = this.ajaxRequest.getResponse();
    //            response.AuthenticationErrorMessage = e.responseText.toString();
    //            //response.set("authenticationErrorMessage", e.responseText.toString());
    //            deferred.resolve(response);
    //        });
    //    return deferred.promise();
    //}
}
export interface IBaseDto extends BaseDto {
    getResponse(): any;
}

//aaa