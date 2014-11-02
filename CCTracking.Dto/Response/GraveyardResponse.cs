using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class GraveyardResponse : BaseModelResponse
    {
        public Graveyard GraveyardModel { get; set; }
        public List<Graveyard> GraveyardList { get; set; }
    }
}
