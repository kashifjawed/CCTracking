using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using CCTracking.Api.App_Start;
using CCTracking.Api.Helpers;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    //[AuthorizationFilter]
    public class BookingController : ApiController
    {
        //BookingStore _bookingStore = new BookingStore();        
        static int rowCounter = 1;



        [HttpPost]
        public Booking SaveBooking(Booking booking)
        {
            if (booking != null)
            {
                if (booking.Id <= 0)
                {
                    booking.CreatedDate = booking.ModifiedDate = DateTime.Today;
                    booking.CreatedBy = booking.ModifiedBy;
                }
                else
                {
                    booking.ModifiedDate = DateTime.Today;

                }
                DBFacade facade = new BookingDal();
                BaseModelResponse bookingResponse = facade.Execute(booking);
                if (!string.IsNullOrEmpty(bookingResponse.ErrorMessage))
                {
                    booking.ErrorMessage = bookingResponse.ErrorMessage;
                }
                else
                {
                    booking = ((BookingResponse)bookingResponse).BookingModel;
                }
            }
            //get rid of alerts from each file, a generic implementation is done on helper
            booking.EntityType = "Booking";
            return booking;
        }

        [HttpGet]
        public LookupResponse BookingDefault()
        {
            DBFacade facade = new CCTracking.DAL.LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }
        [HttpGet]
        public BookingResponse GetAll(int a)
        {
            DBFacade facade = new CCTracking.DAL.BookingDal();
            BaseModelResponse baseModelResponse = facade.GetAll(a);
            BookingResponse bookingResponse = (BookingResponse)baseModelResponse;
            return bookingResponse;
        }
        [HttpGet]
        public BookingResponse GetById(int id)
        {
            DBFacade facade = new CCTracking.DAL.BookingDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            BookingResponse bookingResponse = (BookingResponse)baseModelResponse;
            return bookingResponse;
        }

        //private bool IsValidAuthenticationToken()
        //{
        //    IEnumerable<string> headerList = null;
        //    if (Request.Headers.TryGetValues("AuthenticationToken", out headerList))
        //    {
        //        string authenticationToken = headerList.FirstOrDefault();
        //        Guid authenticationGuid = Guid.Empty;
        //        try
        //        {
        //            if (Guid.TryParse(Security.Decrypt(authenticationToken), out authenticationGuid))
        //            {
        //                return true;
        //            }
        //            else
        //            {
        //                throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        //                {
        //                    Content = new StringContent("Invalid Authentication Token")
        //                });
        //            }
        //        }
        //        catch (Exception exp)
        //        {
        //            throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        //            {
        //                Content = new StringContent("Invalid Authentication Token")
        //            });
        //        }
        //    }
        //    else
        //    {
        //        return false;
        //    }
        //}

    }
}