/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="jquery"/>

var $ = require("jquery");

import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import bookingDto = require("CCTracking.WebClient/Dtos/BookingDto");


export class BookingDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new bookingDto.Models.BookingResponse();
    }
}

export function Load() {
    var o: baseDAL.BaseDto = new BookingDal();
    return o.doAjaxRequest(null, "GET", "Booking");
}

export function Save(bookingRequest: bookingDto.Models.BookingRequest) {
    var o: baseDAL.BaseDto = new BookingDal();
    return o.doAjaxRequest(bookingRequest, "POST", "Booking");
}

export function GetAll(bookingFilterType) {
    var o: baseDAL.BaseDto = new BookingDal();
    return o.doAjaxRequest(null, "GET", "Booking?a=" + bookingFilterType);
}
export function GetById(id) {
    var o: baseDAL.BaseDto = new BookingDal();
    return o.doAjaxRequest(null, "GET", "Booking?id=" + id);
}

//aaa

