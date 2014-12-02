using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class LandmarkController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.Landmark SaveLandmark(CCTracking.Dto.Landmark landmark)
        {
            if (landmark != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new LandmarkDal();
                if (landmark.Id <= 0)
                {
                    landmark.CreatedDate = landmark.ModifiedDate = DateTime.Today;
                    landmark.CreatedBy = landmark.ModifiedBy;
                }
                else
                {
                    landmark.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(landmark);
                //var a = facade.Execute(booking);
                landmark = ((LandmarkResponse)centreResponse).LandmarkModel;
                //bookings.Add(booking);
            }
            return landmark;
        }

        [HttpGet]
        public LookupResponse LandmarkDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public LandmarkResponse GetAll(string a)
        {
            DBFacade facade = new LandmarkDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            LandmarkResponse landmarkResponse = (LandmarkResponse)baseModelResponse;
            return landmarkResponse;
        }
        
        [HttpGet]
        public LandmarkResponse GetById(int id)
        {
            DBFacade facade = new LandmarkDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            LandmarkResponse landmarkResponse = (LandmarkResponse)baseModelResponse;
            return landmarkResponse;
        }
    }
}
