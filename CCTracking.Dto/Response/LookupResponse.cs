using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class LookupResponse : BaseModelResponse
    {
        public List<Lookup> CauseOfDeath { get; set; }
        public List<Lookup> Town { get; set; }
        public List<Lookup> UnionCouncil { get; set; }
        public List<Lookup> Landmark { get; set; }
        public List<Lookup> Graveyard { get; set; }
        public List<Lookup> Bus { get; set; }
        public List<Lookup> AlkhidmatCentre { get; set; }
        public List<Lookup> Driver { get; set; }
        public List<Lookup> Cashier { get; set; }
        public List<Lookup> PaymentType { get; set; }
        public List<Lookup> TimeSlot { get; set; }
        public List<Lookup> Prayers { get; set; }
        public List<Lookup> VisitType { get; set; }
        public List<Lookup> BusModel { get; set; }
        public List<Lookup> Role { get; set; }
        public List<Lookup> RefundType { get; set; }
        public List<Lookup> BusStatus { get; set; }
        
    }
}