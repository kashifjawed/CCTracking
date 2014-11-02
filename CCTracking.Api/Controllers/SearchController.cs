using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class SearchController : ApiController
    {
        [HttpPost]
        public BookingResponse GetByCriteria(SearchCriteria criteria)
        {
            DBFacade facade = new BookingDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(criteria);
            BookingResponse bookingResponse = (BookingResponse)baseModelResponse;
            return bookingResponse;
        }
    }
}
