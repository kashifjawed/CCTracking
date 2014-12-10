using System.Collections.Generic;
using CCTracking.Dto.Audit;

namespace CCTracking.Dto.Response
{
    public class PaymentResponse : BaseModelResponse
    {
        public Payment PaymentModel { get; set; }
        public List<Payment> PaymentList { get; set; }
        public List<AuditDisplay> AuditPaymentDisplayList { get; set; }
        public List<AuditPayment> AuditPaymentList { get; set; }
    }
}
