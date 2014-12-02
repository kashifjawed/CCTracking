using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class BusAvailabilityController : ApiController
    {
        [HttpGet]
        public BusAvailabilityResponse GetBusAvailabilityByCriteria(int id)
        {
            BusAvailabilityResponse availabilityResponse = null;

            if (id > 0)
            {
                DalService service = new DalService();
                BaseModelResponse baseModelResponse = service.GetBusAvailabilityByCriteria(id);
                availabilityResponse = (BusAvailabilityResponse)baseModelResponse;
            }
            return availabilityResponse;

        }
    }
}
