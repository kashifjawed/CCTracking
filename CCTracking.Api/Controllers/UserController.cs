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
	public class UserController : ApiController
	{
		//UserStore _userStore = new UserStore();
		static List<User> users = new List<User>();
		static int rowCounter = 10;
		[HttpGet]
		public User Get(int id)
		{
			DBFacade facade = new UserDal();
			BaseModelResponse baseModelResponse = facade.GetById(id);
			UserResponse userResponse = baseModelResponse as UserResponse;
			return userResponse.UserModel;

		}
		[HttpGet]
		public List<User> GetAll()
		{
			//check if authentication token is invalid throw an exception
			IsValidAuthenticationToken();
			DBFacade facade = new UserDal();
			BaseModelResponse baseModelResponse = facade.GetAll();
			UserResponse userResponse = baseModelResponse as UserResponse;
			return userResponse.UserList;

		}
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

		[HttpGet]
		public Login Post(string UserName, string Password)
		{
			Login login = null;
			User user = new Dto.User { UserName = UserName, Password = Password };

			DBFacade facade = new UserDal();
			BaseModelResponse baseModelResponse = facade.GetByCriteria(user);
			UserResponse userResponse = baseModelResponse as UserResponse;

			if (userResponse.UserList != null && userResponse.UserList.Count > 0)
			{
				login = new Login();

				user = userResponse.UserList.Find(u => u.UserName == UserName);

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
				login = new Login();
				login.ErrorMessage = userResponse.ErrorMessage;
			}
			return login;
		}



		[HttpPost]
		public User SaveUser(User user)
		{
			if (user != null)
			{
				//booking.Id = rowCounter++;
				DBFacade facade = new UserDal();
				if (user.Id <= 0)
				{
                    user.Password = Security.Encrypt(user.UserName + Constant.PasswordSuffix); 
					user.CreatedDate = user.ModifiedDate = DateTime.Today;
					user.CreatedBy = user.ModifiedBy;
				}
				else
				{
					user.ModifiedDate = DateTime.Today;
				}
				user.FromDate = user.ToDate = DateTime.Today;
				BaseModelResponse userResponse = facade.Execute(user);
				if (userResponse is UserResponse)
				{ 
                    user = ((UserResponse)userResponse).UserModel; 
                }
				else
				{
					user.ErrorMessage = userResponse.ErrorMessage;
				}
			}
			return user;
		}

	}
}
