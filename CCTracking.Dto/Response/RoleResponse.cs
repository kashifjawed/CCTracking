using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class RoleResponse : BaseModelResponse
    {
        public Role RoleModel { get; set; }
        public List<Role> RoleList { get; set; }
    }
}
