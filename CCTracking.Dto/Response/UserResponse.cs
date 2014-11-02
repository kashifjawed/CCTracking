using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto.Response
{
    public class UserResponse : BaseModelResponse
    {
        public User UserModel { get; set; }
        public List<User> UserList { get; set; }
    }
}
