using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class Graveyard :  BaseModel
    {

        public int LandmarkId { get; set; }
        public string LandmarkDesc { get; set; }
        public string Name { get; set; }
    }
}
