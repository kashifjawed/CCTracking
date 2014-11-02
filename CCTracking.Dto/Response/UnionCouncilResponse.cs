using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class UnionCouncilResponse : BaseModelResponse
    {
        public UnionCouncil UnionCouncilModel { get; set; }
        public List<UnionCouncil> UnionCouncilList { get; set; }
    }
}
