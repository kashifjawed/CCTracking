using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class VisitTypeResponse : BaseModelResponse
    {
        public VisitType VisitTypeModel { get; set; }
        public List<VisitType> VisitTypeList { get; set; }
    }
}
