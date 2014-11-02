namespace CCTracking.Dto
{
    public class NearestCentre :  BaseModel
    {
        public int CentreId { get; set; }
        public int BusId { get; set; }
        public int BookingId { get; set; }
        public string CentreName { get; set; }
        public string BusList { get; set; }
        public string Address { get; set; }
        public string ContactNo1 { get; set; }
        public string ContactNo2 { get; set; }
        public string OutTime { get; set; }
        public string ReturnTime { get; set; }
        public string BusPoint { get; set; }
        public string Graveyard{ get; set; }
        public string MasjidName{ get; set; }
        public string NamazEJanazaHeldIn { get; set; }
        public string NamazEJanazaLocation { get; set; }
        public string OtherDetail { get; set; }
        public string VehicleNo{ get; set; }
        public string CentreAddress { get; set; }
        public string MobileNo { get; set; }
        public string FullName { get; set; }
        public string CenreAddress { get; set; }
        

    }
}
