using System.Web.Mvc;
using CCTracking.Api.App_Start;

namespace CCTracking.Api
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new AuthorizationFilterAttribute());
        }
    }
}