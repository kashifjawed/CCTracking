using System;
using System.Collections.Generic;
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
    public class AuditPayment : BaseModel
    {
        
        public string BookingId { get; set; }
        public string PaymentType { get; set; }
        public string Pricing { get; set; }
        public string Amount { get; set; }
        public string PaymentLocation { get; set; }
        public string OfficerId { get; set; }
        public string ReceiptNo { get; set; }
        public string ExtraAmountCharge { get; set; }
        public string ExtraAmountReason { get; set; }
        public string ExtraAmountReceipt { get; set; }
        public string PaymentStatus { get; set; }
        public string EasyPaisaTranNo { get; set; }
        public string IsActive { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }

        //for auditing purpose
        public int RowCounter { get; set; }
        public int OperationType { get; set; }
        public DateTime ActualModifiedDate { get; set; }
        public string UserName { get; set; }


    }
}
