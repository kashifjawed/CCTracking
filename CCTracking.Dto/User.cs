using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class User : BaseModel
    {
        public int CentreId { get; set; }
        public string CenterDesc { get; set; }
        public int RoleId { get; set; }
        public string RoleDesc { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ResetPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Cnic { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }

    }

    public enum Roles
    {
        Admin = 1,
        Operator = 2
    }
}
