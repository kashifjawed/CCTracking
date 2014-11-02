using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class TrackingDeviceResponse : BaseModelResponse
    {
        public TrackingDevice TrackingDeviceModel { get; set; }
        public List<TrackingDevice> TrackingDeviceList { get; set; }
    }
}
