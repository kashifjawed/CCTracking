using System;

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

        //for auditing purpose
        public int OperationType { get; set; }

    }

    public class AuditBooking : BaseModel
    {
        public int RowCounter { get; set; }
        public string ContactName { get; set; }
        public string ContactMobile { get; set; }
        public string ContactNic { get; set; }

        public string DeseasedName { get; set; }
        public string  DeseasedAge { get; set; }
        public string DeseasedGender { get; set; }
        public string CauseOfDeath { get; set; }
        public string Address { get; set; }

        public string BusPoint { get; set; }
        public string LandmarkId { get; set; }
        public string UnionCouncilId { get; set; }
        public string TownId { get; set; }
        public string PickupDate { get; set; }

        public string PickupTime { get; set; }
        public string ReturnTime { get; set; }
        public string GraveyardId { get; set; }
        public string NamazEJanazaHeldIn { get; set; }
        public string NamazEJanazaLocation { get; set; }
        public string MasjidName { get; set; }
        public string OtherDetail { get; set; }
        public string IsActive { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }

        //for auditing purpose
        public int OperationType { get; set; }
        public DateTime ActualModifiedDate { get; set; }
        public string UserName { get; set; }


    }
}
