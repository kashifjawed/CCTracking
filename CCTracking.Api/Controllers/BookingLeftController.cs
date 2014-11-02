using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class BookingLeftController : ApiController
    {
        [HttpPost]
        public BookingLeftResponse GetByCriteria(BookingLeft criteria)
        {
            DBFacade facade = new BookingLeftDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(criteria);
            BookingLeftResponse bookingLeftResponse = (BookingLeftResponse)baseModelResponse;
            return bookingLeftResponse;
        }
    }
}
