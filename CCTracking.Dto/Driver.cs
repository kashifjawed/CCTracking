using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
