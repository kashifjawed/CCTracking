/// <reference path="../../Scripts/typings/require/require.d.ts" />
/// <reference path="../../Scripts/typings/marionette/marionette.d.ts" />
import baseDAL = require("CCTracking.WebClient/DAL/AjaxRequest");
import bookingLeftDto = require("CCTracking.WebClient/Dtos/BookingLeftDto");


export class BookingLeftDal extends baseDAL.BaseDto implements baseDAL.IBaseDto {
    constructor() {
        super(this);
    }
    public getResponse() {
        return new bookingLeftDto.Models.BookingLeftDto();
    }
}

export function GetByCriteria(bookingLeftDto: bookingLeftDto.Models.BookingLeftDto) {

    var o: baseDAL.BaseDto = new BookingLeftDal();
    return o.doAjaxRequest(bookingLeftDto, "POST", "BookingLeft");
}

//aaa


