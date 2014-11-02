using System.Collections.Generic;
using System.Data;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class UserDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetUserById";
        }

        protected override string GetAllSql()
        {
            return "GetAllUser";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            User user = baseModel as User;
            dictionary.Add("@UserName", user.UserName);
            dictionary.Add("@Password", user.Password);
            return "GetUserByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            User user = baseModel as User;
            dictionary.Add("@CentreId", user.CentreId);
            dictionary.Add("@RoleId", user.RoleId);
            dictionary.Add("@Password", user.Password);
            dictionary.Add("@UserName", user.UserName);
            dictionary.Add("@FirstName", user.FirstName);
            dictionary.Add("@LastName", user.LastName);
            dictionary.Add("@CNIC", user.Cnic);
            dictionary.Add("@Mobile", user.Mobile);
            dictionary.Add("@Email", user.Email);
            dictionary.Add("@Address", user.Address);
            dictionary.Add("@City", user.City);
            dictionary.Add("@FromDate", user.FromDate);
            dictionary.Add("@ToDate", user.ToDate);
            base.ExecuteSql(baseModel, dictionary);
            return "dbo.SaveUser";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            UserResponse response = new UserResponse();
            User user = null;
            if (dr.Read())
            {
                user = new User();
                MapValues(user, dr);
            }
            response.UserModel = user;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            UserResponse response = new UserResponse();
            User user = null;
            List<User> users = new List<User>();
            while (dr.Read())
            {
                user = new User();
                MapValues(user, dr);
                users.Add(user);
            }
            response.UserList = users;
            return response;
        }

        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            return null;
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            return string.Empty;
        }

        protected override string GetCountSql()
        {
            return string.Empty;
        }

        protected override void MapValues(BaseModel baseModel, IDataReader dr)
        {
            base.MapValues(baseModel, dr);
            User user = baseModel as User;
            user.UserName = dr.GetString(dr.GetOrdinal("UserName"));
            if (!dr.IsDBNull(dr.GetOrdinal("FirstName")))
                user.FirstName = dr.GetString(dr.GetOrdinal("FirstName"));
            if (!dr.IsDBNull(dr.GetOrdinal("LastName")))
                user.LastName = dr.GetString(dr.GetOrdinal("LastName"));
            if (!dr.IsDBNull(dr.GetOrdinal("Address")))
                user.Address = dr.GetString(dr.GetOrdinal("Address"));
            if (!dr.IsDBNull(dr.GetOrdinal("City")))
                user.City = dr.GetString(dr.GetOrdinal("City"));
            if (!dr.IsDBNull(dr.GetOrdinal("Mobile")))
                user.Mobile = dr.GetString(dr.GetOrdinal("Mobile"));
            if (!dr.IsDBNull(dr.GetOrdinal("Email")))
                user.Email = dr.GetString(dr.GetOrdinal("Email"));
            if (!dr.IsDBNull(dr.GetOrdinal("CNIC")))
                user.Cnic = dr.GetString(dr.GetOrdinal("CNIC"));
            user.RoleId = dr.GetInt32(dr.GetOrdinal("RoleId"));
            if (!dr.IsDBNull(dr.GetOrdinal("RoleDesc")))
                user.RoleDesc = dr.GetString(dr.GetOrdinal("RoleDesc"));
            user.CentreId = dr.GetInt32(dr.GetOrdinal("CentreId"));
            if (!dr.IsDBNull(dr.GetOrdinal("CenterDesc")))
                user.CenterDesc = dr.GetString(dr.GetOrdinal("CenterDesc"));
        }
    }
}
