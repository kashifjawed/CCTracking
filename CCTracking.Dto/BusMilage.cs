using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
   public class BusMilage
    {
        public int BusId { get; set; }
        public string CentreDesc { get; set; }
        public string VehicleNo { get; set; }
        public int TotalMilage { get; set; }
        public int TotalVisits { get; set; }
    }
}
