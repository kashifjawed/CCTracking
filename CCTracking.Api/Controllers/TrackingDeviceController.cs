using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class TrackingDeviceController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.TrackingDevice SaveTrackingDevice(CCTracking.Dto.TrackingDevice trackingDevice)
        {
            if (trackingDevice != null)
            {
                DBFacade facade = new TrackingDeviceDal();
                if (trackingDevice.Id <= 0)
                {
                    trackingDevice.CreatedDate = trackingDevice.ModifiedDate = DateTime.Today;
                    trackingDevice.CreatedBy = trackingDevice.ModifiedBy;
                }
                else
                {
                    trackingDevice.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(trackingDevice);
                trackingDevice = ((TrackingDeviceResponse)centreResponse).TrackingDeviceModel;
            }
            return trackingDevice;
        }

        [HttpGet]
        public LookupResponse TrackingDeviceDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public TrackingDeviceResponse GetAll(string a)
        {
            DBFacade facade = new TrackingDeviceDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            TrackingDeviceResponse trackingDeviceResponse = (TrackingDeviceResponse)baseModelResponse;
            return trackingDeviceResponse;
        }
        
        [HttpGet]
        public TrackingDeviceResponse GetById(int id)
        {
            DBFacade facade = new TrackingDeviceDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            TrackingDeviceResponse trackingDeviceResponse = (TrackingDeviceResponse)baseModelResponse;
            return trackingDeviceResponse;
        }
    }
}
