using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CCTracking.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Nic { get; set; }
        //public string Relashonship { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public string AuthenticationToken { get; set; }
        public string AuthenticationErrorMessage { get; set; }
    }
    public class UserStore
    {
        List<User> users = new List<User>();
        public List<User> GetAllUsers()
        {
            users.Add(new User { Id = 1, UserName = "Muhammad", FirstName = "Muhammad", LastName = "Ahmed", Email = "ma@ma.com", Mobile = "111222333", Password = "1",IsAdmin=true });
            users.Add(new User { Id = 2, UserName = "saeed", FirstName = "Saeed", LastName = "Ahmed", Email = "saeed@yahoo.com", Mobile = "1111111111", Password = "1", IsAdmin=true });
            users.Add(new User { Id = 3, UserName = "jc", FirstName = "JC", LastName = "Butler", Email = "jc@yahoo.com", Mobile = "2222222222", Password = "1", IsAdmin = false });
            users.Add(new User { Id = 4, UserName = "username3", FirstName = "fname3", LastName = "lname3", Email = "email3@yahoo.com", Mobile = "3333333333", Password = "123" });
            users.Add(new User { Id = 5, UserName = "username4", FirstName = "fname4", LastName = "lname4", Email = "email4@yahoo.com", Mobile = "4444444444", Password = "123" });

            users.Add(new User { Id = 6, UserName = "Muhammad", FirstName = "Muhammad", LastName = "Ahmed", Email = "ma@ma.com", Mobile = "111222333", Password = "123" });
            users.Add(new User { Id = 7, UserName = "username1", FirstName = "fname1", LastName = "lname1", Email = "email1@yahoo.com", Mobile = "1111111111", Password = "123" });
            users.Add(new User { Id = 8, UserName = "username2", FirstName = "fname2", LastName = "lname2", Email = "email2@yahoo.com", Mobile = "2222222222", Password = "123" });
            users.Add(new User { Id = 9, UserName = "username3", FirstName = "fname3", LastName = "lname3", Email = "email3@yahoo.com", Mobile = "3333333333", Password = "123" });
            users.Add(new User { Id = 10, UserName = "username4", FirstName = "fname4", LastName = "lname4", Email = "email4@yahoo.com", Mobile = "4444444444", Password = "123" });

            users.Add(new User { Id = 11, UserName = "Muhammad", FirstName = "Muhammad", LastName = "Ahmed", Email = "ma@ma.com", Mobile = "111222333", Password = "123" });
            users.Add(new User { Id = 12, UserName = "username1", FirstName = "fname1", LastName = "lname1", Email = "email1@yahoo.com", Mobile = "1111111111", Password = "123" });
            users.Add(new User { Id = 13, UserName = "username2", FirstName = "fname2", LastName = "lname2", Email = "email2@yahoo.com", Mobile = "2222222222", Password = "123" });
            users.Add(new User { Id = 14, UserName = "username3", FirstName = "fname3", LastName = "lname3", Email = "email3@yahoo.com", Mobile = "3333333333", Password = "123" });
            users.Add(new User { Id = 15, UserName = "username4", FirstName = "fname4", LastName = "lname4", Email = "email4@yahoo.com", Mobile = "4444444444", Password = "123" });

            users.Add(new User { Id = 16, UserName = "Muhammad", FirstName = "Muhammad", LastName = "Ahmed", Email = "ma@ma.com", Mobile = "111222333", Password = "123" });
            users.Add(new User { Id = 17, UserName = "username1", FirstName = "fname1", LastName = "lname1", Email = "email1@yahoo.com", Mobile = "1111111111", Password = "123" });
            users.Add(new User { Id = 18, UserName = "username2", FirstName = "fname2", LastName = "lname2", Email = "email2@yahoo.com", Mobile = "2222222222", Password = "123" });
            users.Add(new User { Id = 19, UserName = "username3", FirstName = "fname3", LastName = "lname3", Email = "email3@yahoo.com", Mobile = "3333333333", Password = "123" });
            users.Add(new User { Id = 20, UserName = "username4", FirstName = "fname4", LastName = "lname4", Email = "email4@yahoo.com", Mobile = "4444444444", Password = "123" });


            return users;
        }
    }

}