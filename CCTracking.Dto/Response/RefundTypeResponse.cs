using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class RefundTypeResponse : BaseModelResponse
    {
        public RefundType RefundTypeModel { get; set; }
        public List<RefundType> RefundTypeList { get; set; }
    }
}
