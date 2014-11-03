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
    public class ResetPasswordController : ApiController
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
        public User Post(User user)
        {
            DBFacade facade = new UserDal();
            BaseModelResponse response = facade.GetById(user.Id);
            if (string.IsNullOrEmpty(response.ErrorMessage))
            {
                user = ((response) as UserResponse).UserModel;
                facade = new ResetPasswordDal();

                user.Password =  Security.Encrypt(user.UserName+ Constant.PasswordSuffix);
                response = facade.Execute(user);
                if (!string.IsNullOrEmpty(response.ErrorMessage))
                {
                    user.ErrorMessage = response.ErrorMessage;
                }
            }
            return user;
        }
    }
}
