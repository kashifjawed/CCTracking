using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class BusMilageController : ApiController
    {
        [HttpPost]
        public BusMilageResponse GetByCriteria(SearchCriteria criteria)
        {
            DBFacade facade = new BusMilageDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(criteria);
            BusMilageResponse response = (BusMilageResponse)baseModelResponse;
            return response;
        }
    }
}
