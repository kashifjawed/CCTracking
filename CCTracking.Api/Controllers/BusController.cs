using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class BusController : ApiController
    {
        //BookingStore _bookingStore = new BookingStore();        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.Bus SaveAlkhidmatCentre(CCTracking.Dto.Bus bus)
        {
            if (bus != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new BusDal();
                if (bus.Id <= 0)
                {
                    bus.CreatedDate = bus.ModifiedDate = DateTime.Today;
                    bus.CreatedBy = bus.ModifiedBy;
                }
                else
                {
                    bus.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(bus);
                //var a = facade.Execute(booking);
                bus = ((BusResponse)centreResponse).BusModel;
                //bookings.Add(booking);
            }
            return bus;
        }

        [HttpGet]
        public LookupResponse AlkhidmatCentreDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public BusResponse GetAll(string a)
        {
            DBFacade facade = new BusDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            BusResponse busResponse = (BusResponse)baseModelResponse;
            return busResponse;
        }
        
        [HttpGet]
        public BusResponse GetById(int id)
        {
            DBFacade facade = new BusDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            BusResponse busResponse = (BusResponse)baseModelResponse;
            return busResponse;
        }
    }
}
