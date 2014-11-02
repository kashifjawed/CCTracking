using System;
using System.Collections.Generic;

namespace CCTracking.Dto.Response
{
    public class BookingResponse :BaseModelResponse
    {
        public Booking BookingModel { get; set; }
        public List<Booking> BookingList { get; set; }
    }
}
