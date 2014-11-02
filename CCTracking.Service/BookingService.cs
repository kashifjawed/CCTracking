using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCTracking.Dto;
namespace CCTracking.Service
{
    public class BookingService : BaseService
    {
        public Booking BookingModel { get; set; }
        public List<Booking> BookingList { get; set; }
    }
}
