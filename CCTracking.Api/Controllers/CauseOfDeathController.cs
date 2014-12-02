using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class CauseOfDeathController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.CauseofDeath SaveCauseOfDeath(CCTracking.Dto.CauseofDeath causeOfDeath)
        {
            if (causeOfDeath != null)
            {
                DBFacade facade = new CauseofDeathDal();
                if (causeOfDeath.Id <= 0)
                {
                    causeOfDeath.CreatedDate = causeOfDeath.ModifiedDate = DateTime.Today;
                    causeOfDeath.CreatedBy = causeOfDeath.ModifiedBy;
                }
                else
                {
                    causeOfDeath.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(causeOfDeath);
                causeOfDeath = ((CauseofDeathResponse)centreResponse).CauseofDeathModel;
            }
            return causeOfDeath;
        }

        [HttpGet]
        public LookupResponse CauseOfDeathDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public CauseofDeathResponse GetAll(string a)
        {
            DBFacade facade = new CauseofDeathDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            CauseofDeathResponse causeOfDeathResponse = (CauseofDeathResponse)baseModelResponse;
            return causeOfDeathResponse;
        }
        
        [HttpGet]
        public CauseofDeathResponse GetById(int id)
        {
            DBFacade facade = new CauseofDeathDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            CauseofDeathResponse causeOfDeathResponse = (CauseofDeathResponse)baseModelResponse;
            return causeOfDeathResponse;
        }
    }
}
