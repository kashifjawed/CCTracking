using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class TownController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.Town SaveTown(CCTracking.Dto.Town town)
        {
            if (town != null)
            {
                DBFacade facade = new TownDal();
                if (town.Id <= 0)
                {
                    town.CreatedDate = town.ModifiedDate = DateTime.Today;
                    town.CreatedBy = town.ModifiedBy;
                }
                else
                {
                    town.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse response = facade.Execute(town);
                if (!string.IsNullOrEmpty(response.ErrorMessage))
                {
                    town.ErrorMessage = response.ErrorMessage;
                }
                else
                {
                    town = ((TownResponse)response).TownModel;
                }
            }
            return town;
        }

        [HttpGet]
        public LookupResponse TownDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public TownResponse GetAll(string a)
        {
            DBFacade facade = new TownDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            TownResponse townResponse = (TownResponse)baseModelResponse;
            return townResponse;
        }
        
        [HttpGet]
        public TownResponse GetById(int id)
        {
            DBFacade facade = new TownDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            TownResponse townResponse = (TownResponse)baseModelResponse;
            return townResponse;
        }
    }
}
