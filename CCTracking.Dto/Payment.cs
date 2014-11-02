using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class Payment : BaseModel
    {
        public int BookingId { get; set; }
        public byte PaymentType { get; set; }
        public byte Pricing { get; set; }
        public decimal Amount { get; set; }
        public int PaymentLocation { get; set; }
        public int OfficerId { get; set; }
        public string ReceiptNo { get; set; }
        public decimal ExtraAmountCharge { get; set; }
        public string ExtraAmountReason { get; set; }
        public string ExtraAmountReceipt { get; set; }
        public byte PaymentStatus { get; set; }
        public string EasyPaisaTranNo { get; set; }
        public List<BusVisit> BusVisits { get; set; }
    }
}
