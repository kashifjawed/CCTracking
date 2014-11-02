using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class Landmark :  BaseModel
    {
        public int UcId { get; set; }
        public string  UcDesc { get; set; }
        public string Name { get; set; }
    }
}
