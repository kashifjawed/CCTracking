using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class BusResponse : BaseModelResponse
    {
        public Bus BusModel { get; set; }
        public List<Bus> BusList { get; set; }
    }
}
