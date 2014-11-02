using System;
using System.Collections.Generic;

namespace CCTracking.Dto.Response
{
    public class PaymentResponse : BaseModelResponse
    {
        public Payment PaymentModel { get; set; }
        public List<Payment> PaymentList { get; set; }
    }
}
