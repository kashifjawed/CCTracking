using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.Dto
{
    public class Login
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string  Password { get; set; }
        public string ResetPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CNIC { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public bool IsAdmin { get; set; }
        public string AuthenticationToken { get; set; }
        public string ErrorMessage { get; set; }
    }

   
}
