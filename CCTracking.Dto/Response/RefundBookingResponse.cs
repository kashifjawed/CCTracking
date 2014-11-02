using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class RefundBookingResponse : BaseModelResponse
    {
        public RefundBooking RefundBookingModel { get; set; }
        public List<RefundBooking> RefundBookingList { get; set; }
    }
}
