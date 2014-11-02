using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class DriverResponse : BaseModelResponse
    {
        public Driver DriverModel { get; set; }
        public List<Driver> DriverList { get; set; }
    }
}
