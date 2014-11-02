using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class GraveyardController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.Graveyard SaveGraveyard(CCTracking.Dto.Graveyard graveyard)
        {
            if (graveyard != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new GraveyardDal();
                if (graveyard.Id <= 0)
                {
                    graveyard.CreatedDate = graveyard.ModifiedDate = DateTime.Today;
                    graveyard.CreatedBy = graveyard.ModifiedBy;
                }
                else
                {
                    graveyard.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse response = facade.Execute(graveyard);

                if (!string.IsNullOrEmpty(response.ErrorMessage))
                {
                    graveyard.ErrorMessage = response.ErrorMessage;
                }
                else
                {
                    graveyard = ((GraveyardResponse)response).GraveyardModel;
                }
            }
            return graveyard;
        }

        [HttpGet]
        public LookupResponse AlkhidmatCentreDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public GraveyardResponse GetAll(string a)
        {
            DBFacade facade = new GraveyardDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            GraveyardResponse graveyardResponse = (GraveyardResponse)baseModelResponse;
            return graveyardResponse;
        }
        
        [HttpGet]
        public GraveyardResponse GetById(int id)
        {
            DBFacade facade = new GraveyardDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            GraveyardResponse graveyardResponse = (GraveyardResponse)baseModelResponse;
            return graveyardResponse;
        }
    }
}
