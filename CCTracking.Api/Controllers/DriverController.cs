using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class DriverController : ApiController
    {
        //BookingStore _bookingStore = new BookingStore();        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.Driver SaveAlkhidmatCentre(CCTracking.Dto.Driver driver)
        {
            if (driver != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new DriverDal();
                if (driver.Id <= 0)
                {
                    driver.CreatedDate = driver.ModifiedDate = DateTime.Today;
                    driver.CreatedBy = driver.ModifiedBy;
                }
                else
                {
                    driver.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(driver);
                //var a = facade.Execute(booking);
                driver = ((DriverResponse)centreResponse).DriverModel;
                //bookings.Add(booking);
            }
            return driver;
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
        public DriverResponse GetAll(string a)
        {
            DBFacade facade = new DriverDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            DriverResponse driverResponse = (DriverResponse)baseModelResponse;
            return driverResponse;
        }
        
        [HttpGet]
        public DriverResponse GetById(int id)
        {
            DBFacade facade = new DriverDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            DriverResponse driverResponse = (DriverResponse)baseModelResponse;
            return driverResponse;
        }
    }
}
