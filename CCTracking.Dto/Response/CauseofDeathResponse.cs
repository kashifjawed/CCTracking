using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class CauseofDeathResponse : BaseModelResponse
    {
        public CauseofDeath CauseofDeathModel { get; set; }
        public List<CauseofDeath> CauseofDeathList { get; set; }
    }
}
