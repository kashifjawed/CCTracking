using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class BusVisitSummaryController : ApiController
    {
        [HttpGet]
        public BusVisitResponse GetAllSummary()
        {
            DBFacade facade = new BusVisitSummaryDal();
            BaseModelResponse baseModelResponse = facade.GetAll(0);
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse;
        }
        [HttpGet]
        public BusVisitResponse GetAllDetail(int id)
        {
            DBFacade facade = new BusVisitSummaryDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new BusVisit{ BusId = id });
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse;
        }
    }
}
