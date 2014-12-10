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
    public class AuditRefundBooking : BaseModel
    {
        public string BookingId { get; set; }
        public string ActualBookingAmount { get; set; }
        public string RefundOfficeLocation { get; set; }
        public string RefundTypeId { get; set; }
        public string RefundAmount { get; set; }
        public string AmountDeducted { get; set; }
        public string RefundReason { get; set; }
        public string RefundReceipt { get; set; }
        public string RefundOfficer { get; set; }

        //for auditing purpose
        public int RowCounter { get; set; }
        public int OperationType { get; set; }
        public DateTime ActualModifiedDate { get; set; }
        public string UserName { get; set; }
        public string IsActive { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }

    }
}
