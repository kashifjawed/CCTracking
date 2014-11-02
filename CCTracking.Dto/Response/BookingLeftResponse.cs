using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class BookingLeftResponse : BaseModelResponse
    {
        public BookingLeft BookingLeftModel { get; set; }
        public List<BookingLeft> BookingLeftList { get; set; }
    }
}
