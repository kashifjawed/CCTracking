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
    public class ChangePasswordController : ApiController
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

            User user = new Dto.User { UserName = login.UserName, Password = Security.Encrypt(login.Password), ResetPassword = Security.Encrypt(login.ChangePassword) };

            DBFacade facade = new ChangePasswordDal();
            login.Password = string.Empty;
            login.ChangePassword = string.Empty;

            BaseModelResponse response = facade.Execute(user);
           // UserResponse response = baseModelResponse as UserResponse;

            if (!string.IsNullOrEmpty(response.ErrorMessage))
            {
                login.ErrorMessage = response.ErrorMessage;
            }
            return login;
        }
    }
}
