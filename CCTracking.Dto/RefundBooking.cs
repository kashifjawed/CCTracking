using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class RefundBooking : BaseModel
    {
        public int BookingId { get; set; }
        public decimal ActualBookingAmount { get; set; }
        public int RefundOfficeLocation { get; set; }
        public int RefundTypeId { get; set; }
        public decimal RefundAmount { get; set; }
        public decimal AmountDeducted { get; set; }
        public string RefundReason { get; set; }
        public string RefundReceipt { get; set; }
        public int RefundOfficer { get; set; }

    }
}
