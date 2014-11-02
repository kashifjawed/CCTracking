using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class NearestCentreController : ApiController
    {
        //[HttpPost]
        //public Dto.BusVisit SaveBusVisit(Dto.BusVisit busVisit)
        //{
        //    if (busVisit != null)
        //    {
        //        DBFacade facade = new NearestCentreDal();
        //        if (busVisit.Id <= 0)
        //        {
        //            busVisit.CreatedDate = busVisit.ModifiedDate = DateTime.Today;
        //            busVisit.CreatedBy = busVisit.ModifiedBy;
        //        }
        //        else
        //        {
        //            busVisit.ModifiedDate = DateTime.Today;
        //        }
        //        BaseModelResponse response = facade.Execute(busVisit);
        //        busVisit = ((NearestCentreResponse)response).BusVisitModel;
        //    }
        //    return busVisit;
        //}


        //[HttpGet]
        //public LookupResponse BusVisitDefault()
        //{
        //    DBFacade facade = new LookupDal();
        //    BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
        //    LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
        //    return lookupResponse;
        //}

        [HttpGet]
        public NearestCentreResponse GetAll(int idAll)
        {
            DBFacade facade = new NearestCentreDal("GetAll");
            BaseModelResponse baseModelResponse = facade.GetAll(idAll);
            NearestCentreResponse response = (NearestCentreResponse)baseModelResponse;
            return response;
        }

        /// <summary>
        /// Return NearestCentre list based on centreId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public NearestCentreResponse GetByCriteria(int id)
        {
            DBFacade facade = new NearestCentreDal("GetByCriteria");
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new NearestCentre {BusId = id});
            NearestCentreResponse response = (NearestCentreResponse) baseModelResponse;
            return response;
        }
    }
}
