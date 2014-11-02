using System;
using CCTracking.Api.Helpers;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using System.Net.Http;

namespace CCTracking.Api.Controllers
{
    public class ValidAuthenticationTokenAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            IEnumerable<string> headerList = HttpContext.Current.Request.Headers.GetValues("AuthenticationToken");
            string authenticationToken = headerList.FirstOrDefault();
            Guid authenticationGuid = Guid.Empty;
            try
            {
                if (Guid.TryParse(Security.Decrypt(authenticationToken), out authenticationGuid))
                {
                    //return true;
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

            base.OnActionExecuting(filterContext);
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            if (filterContext.Exception != null)
                filterContext.HttpContext.Trace.Write("(Logging Filter)Exception thrown");

            base.OnActionExecuted(filterContext);
        }

    }
}
