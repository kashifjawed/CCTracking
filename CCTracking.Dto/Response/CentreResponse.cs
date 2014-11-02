using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class CentreResponse : BaseModelResponse
    {
        public AlkhidmatCentre CentreModel { get; set; }
        public List<AlkhidmatCentre> CentreList { get; set; }
    }
}
