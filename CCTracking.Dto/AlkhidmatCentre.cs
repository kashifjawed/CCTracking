using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class AlkhidmatCentre : BaseModel
    {
        public string Name { get; set; }
        public string   Address  { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public int LandmarkId { get; set; }
        public bool IsCoPartner { get; set; }
    }
}
