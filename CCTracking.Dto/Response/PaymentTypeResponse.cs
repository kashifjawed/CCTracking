using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class PaymentTypeResponse : BaseModelResponse
    {
        public PaymentType PaymentTypeModel { get; set; }
        public List<PaymentType> PaymentTypeList { get; set; }
    }
}
