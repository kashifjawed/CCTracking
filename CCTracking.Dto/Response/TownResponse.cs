using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class TownResponse : BaseModelResponse
    {
        public Town TownModel { get; set; }
        public List<Town> TownList { get; set; }
    }
}
