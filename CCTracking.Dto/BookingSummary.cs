namespace CCTracking.Dto
{
    public class BookingSummary : BaseModel
    {
        public string AlkhidmatCentre { get; set; }
        public int UnpaidAmount { get; set; }
        public int PaidAmount { get; set; }
        public int PaidBooking { get; set; }
        public int UnpaidBooking { get; set; }
    }
}
