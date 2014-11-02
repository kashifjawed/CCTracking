using System;
using System.Collections.Generic;

namespace CCTracking.Dto.Response
{
    public class BusMilageResponse : BaseModelResponse
    {
        public BusMilage BusMilageModel { get; set; }
        public List<BusMilage> BusMilageList { get; set; }
    }
}
