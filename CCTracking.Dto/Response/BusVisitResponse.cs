using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class BusVisitResponse : BaseModelResponse
    {
        public BusVisit BusVisitModel { get; set; }
        public List<BusVisit> BusVisitList { get; set; }
    }
}
