using System;
using System.Collections.Generic;
using CCTracking.Dto.Audit;

namespace CCTracking.Dto.Response
{
    public class BookingResponse :BaseModelResponse
    {
        public Booking BookingModel { get; set; }
        public List<Booking> BookingList { get; set; }
        public List<AuditDisplay> AuditBookingDisplayList { get; set; }
        public List<AuditBooking> AuditBookingList { get; set; }
    }
}
