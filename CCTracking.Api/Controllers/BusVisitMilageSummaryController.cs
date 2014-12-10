using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class BusVisitMilageSummaryController : ApiController
    {
        [HttpGet]
        public BusVisitResponse GetAllSummary()
        {
            DBFacade facade = new BusVisitMilageSummaryDal();
            BaseModelResponse baseModelResponse = facade.GetAll(0);
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse;
        }
        [HttpGet]
        public BusVisitResponse GetAllDetail(int id)
        {
            DBFacade facade = new BusVisitMilageSummaryDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new BusVisit { BusId = id });
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse;
        }
    }
}
