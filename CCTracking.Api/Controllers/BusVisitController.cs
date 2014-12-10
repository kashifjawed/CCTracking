using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class BusVisitController : ApiController
    {
        [HttpPost]
        public CCTracking.Dto.BusVisit SaveBusVisit(CCTracking.Dto.BusVisit busVisit)
        {
            if (busVisit != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new CCTracking.DAL.BusVisitDal();
                if (busVisit.Id <= 0)
                {
                    busVisit.CreatedDate = busVisit.ModifiedDate = DateTime.Today;
                    busVisit.CreatedBy = busVisit.ModifiedBy;
                }
                else
                {
                    busVisit.ModifiedDate = DateTime.Today;
                }
                if ((VisitTypes)busVisit.VisitTypeId != VisitTypes.PatrolPump)
                {
                    busVisit.PumpLocation = string.Empty;
                    busVisit.FuelAmount = busVisit.FuelRate = 0;
                }
                if ((VisitTypes)busVisit.VisitTypeId != VisitTypes.Booking)
                {
                    busVisit.IsBookingCompleted = false;
                }
                BaseModelResponse response = facade.Execute(busVisit);
                busVisit = ((BusVisitResponse)response).BusVisitModel;
            }
            return busVisit;
        }

        [HttpGet]
        public LookupResponse BusVisitDefault()
        {
            DBFacade facade = new CCTracking.DAL.LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public BusVisitResponse GetAll(int idAll)
        {
            DBFacade facade = new CCTracking.DAL.BusVisitDal();
            BaseModelResponse baseModelResponse = facade.GetAll(idAll);
            BusVisitResponse response = (BusVisitResponse)baseModelResponse;
            return response;
        }

        [HttpGet]
        public BusVisitResponse GetById(int id)
        {
            DBFacade facade = new CCTracking.DAL.BusVisitDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            BusVisitResponse response = (BusVisitResponse)baseModelResponse;
            return response;
        }
    }
}