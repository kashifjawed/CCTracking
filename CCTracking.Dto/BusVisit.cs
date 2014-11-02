using System;

namespace CCTracking.Dto
{
    public class BusVisit :  BaseModel
    {
        public int CentreId { get; set; }        
        public string CentreDesc { get; set; }
        public int BusId { get; set; }
        public string BusDesc { get; set; }
        public int DriverId { get; set; }
        public string DriverDesc { get; set; }
        public int VisitTypeId { get; set; }
        public string VisitTypeDesc { get; set; }
        public int BookingId { get; set; }
        public string InchargeName { get; set; }
        public DateTime? VisitDate { get; set; }
        public byte OutTime { get; set; }
        public byte ReturnTime { get; set; }
        public long ReadingWhenFilling { get; set; }
        public string PumpLocation { get; set; }
        public decimal FuelRate { get; set; }
        public decimal FuelAmount { get; set; }
        public bool IsBookingCompleted { get; set; }
        public long InitialReading { get; set; }
        public long FinalReading { get; set; }
        public string Description { get; set; }
    }
    
}
