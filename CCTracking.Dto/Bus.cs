namespace CCTracking.Dto
{
    public class Bus : BaseModel
    {
        public int CentreId { get; set; }
        public string CentreDesc { get; set; }
        public string TrackingDeviceId { get; set; }
        public string VehicleNo { get; set; }
        public long InitialReading { get; set; }
        public string No { get; set; }
        public string ModelNo { get; set; }
        public string Description { get; set; }
        public byte BusStatus { get; set; }
        public byte BookForPrayer { get; set; }
    }
}