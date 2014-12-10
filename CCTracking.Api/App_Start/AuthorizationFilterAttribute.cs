using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using CCTracking.Api.Helpers;

namespace CCTracking.Api.App_Start
{
    public class AuthorizationFilterAttribute : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            IEnumerable<string> headerList = null;
            if (actionContext.Request.Headers.TryGetValues("AuthenticationToken", out headerList))
            {
                string authenticationToken = headerList.FirstOrDefault();
                Guid authenticationGuid = Guid.Empty;

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
            else
            {
                throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
                {
                    Content = new StringContent("Invalid Authentication Token")
                });
            }
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            
        }
        //public override void OnAuthorization(HttpActionContext actionContext)
        //{
        //    IEnumerable<string> headerList = null;
        //    if (actionContext.Request.Headers.TryGetValues("AuthenticationToken", out headerList))
        //    {
        //        string authenticationToken = headerList.FirstOrDefault();
        //        Guid authenticationGuid = Guid.Empty;

        //        if (Guid.TryParse(Security.Decrypt(authenticationToken), out authenticationGuid))
        //        {
        //            return;
        //        }
        //        else
        //        {
        //            throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        //            {
        //                Content = new StringContent("Invalid Authentication Token")
        //            });
        //        }
        //    }
        //    else
        //    {
        //        throw new HttpResponseException(new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized)
        //        {
        //            Content = new StringContent("Invalid Authentication Token")
        //        });
        //    }
        //    //base.OnAuthorization(actionContext);    

        //}
    }
}