using System;

namespace CCTracking.Dto
{
   public  class Driver : BaseModel
    {
        public int CentreId { get; set; }
        public string CentreDesc { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string  Cnic { get; set; }
        public string Mobile { get; set; }
        public string  Address { get; set; }
        public string City { get; set; }


       //Report Related Properties
       public int DriverId { get; set; }
       public string DriverName { get; set; }
       public string Milage { get; set; }
       public int VisitCount { get; set; }
       public string VehicleNo { get; set; }
       public DateTime VisitDate { get; set; }
       public string VisitInterval { get; set; }
       public int BookingId { get; set; }
    }
}
