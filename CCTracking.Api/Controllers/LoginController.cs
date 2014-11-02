using CCTracking.Api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto.Response;
using CCTracking.Dto;


namespace CCTracking.Api.Controllers
{
    public class LoginController : ApiController
	{
		

		private bool IsValidAuthenticationToken()
		{
			IEnumerable<string> headerList = Request.Headers.GetValues("AuthenticationToken");
			string authenticationToken = headerList.FirstOrDefault();
			Guid authenticationGuid = Guid.Empty;
			try
			{
				if (Guid.TryParse(Security.Decrypt(authenticationToken), out authenticationGuid))
				{
					return true;
				}
				else
				{
					throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
					{
						Content = new StringContent("Invalid Authentication Token")
					});
				}
			}
			catch (Exception exp)
			{
				throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
				{
					Content = new StringContent("Invalid Authentication Token")
				});
			}
		}

		[HttpPost]
		public Login Post(Login login)
		{
		//	Login login = null;

			User user = new Dto.User { UserName = login.UserName, Password = Security.Encrypt( login.Password) };

			DBFacade facade = new UserDal();
            login.Password = string.Empty;
			BaseModelResponse baseModelResponse = facade.GetByCriteria(user);
			UserResponse userResponse = baseModelResponse as UserResponse;

			if (userResponse.UserList != null && userResponse.UserList.Count > 0)
			{
                user = userResponse.UserList.Find(u => u.UserName == login.UserName);

				login.Id = user.Id;
				login.UserName = user.UserName;
				login.FirstName = user.FirstName;
				login.LastName = user.LastName;
				login.Mobile = user.Mobile;
				login.Email = user.Email;
				login.Address = user.Address;
				login.CNIC = user.Cnic;
				login.AuthenticationToken = Security.Encrypt(Guid.NewGuid().ToString());
				login.IsAdmin = (Roles)user.RoleId == Roles.Admin;
			}          
			else if (!string.IsNullOrEmpty(userResponse.ErrorMessage))
			{
				login.ErrorMessage = userResponse.ErrorMessage;
			}
            else
            {
                login.ErrorMessage = "Invalid User Id and/or Password. <br>Please Try again.";
            }
			return login;
		}

		
	}
}
