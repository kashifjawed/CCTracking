using System.Collections.Generic;

namespace CCTracking.Dto.Response
{
    public class BusAvailabilityResponse :BaseModelResponse
    {
        public Bus BusAvailabilityModel { get; set; }
        public List<Bus> BusAvailabilityList { get; set; }
    }
}
