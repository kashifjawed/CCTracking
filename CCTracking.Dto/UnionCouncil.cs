using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class UnionCouncil : BaseModel
    {
        public int TownId { get; set; }
        public string TownDesc { get; set; }
        public string Name { get; set; }
    }
}
