using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class Booking : BaseModel
    {
        public string ContactName { get; set; }
        public string ContactMobile { get; set; }
        public string ContactNic { get; set; }

        public string DeseasedName { get; set; }
        public byte DeseasedAge { get; set; }
        public byte DeseasedGender { get; set; }
        public byte CauseOfDeath { get; set; }
        public string Address { get; set; }

        public int BusPoint { get; set; }
        public int LandmarkId { get; set; }
        public int UnionCouncilId { get; set; }
        public int TownId { get; set; }
        public DateTime PickupDate { get; set; }

        public byte PickupTime { get; set; }
        public byte ReturnTime { get; set; }
        public byte GraveyardId { get; set; }
        public byte NamazEJanazaHeldIn  { get; set; }
        public string NamazEJanazaLocation { get; set; }
        public string MasjidName{ get; set; }        
        public string OtherDetail { get; set; }
    }
}
