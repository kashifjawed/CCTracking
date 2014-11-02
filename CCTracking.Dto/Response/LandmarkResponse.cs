using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class LandmarkResponse : BaseModelResponse
    {
        public Landmark LandmarkModel { get; set; }
        public List<Landmark> LandmarkList { get; set; }
    }
}
