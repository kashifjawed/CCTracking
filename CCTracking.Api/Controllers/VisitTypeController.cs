using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class VisitTypeController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.VisitType SaveVisitType(CCTracking.Dto.VisitType visitType)
        {
            if (visitType != null)
            {
                DBFacade facade = new VisitTypeDal();
                if (visitType.Id <= 0)
                {
                    visitType.CreatedDate = visitType.ModifiedDate = DateTime.Today;
                    visitType.CreatedBy = visitType.ModifiedBy;
                }
                else
                {
                    visitType.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(visitType);
                visitType = ((VisitTypeResponse)centreResponse).VisitTypeModel;
            }
            return visitType;
        }

        [HttpGet]
        public LookupResponse VisitTypeDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public VisitTypeResponse GetAll(string a)
        {
            DBFacade facade = new VisitTypeDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            VisitTypeResponse visitTypeResponse = (VisitTypeResponse)baseModelResponse;
            return visitTypeResponse;
        }
        
        [HttpGet]
        public VisitTypeResponse GetById(int id)
        {
            DBFacade facade = new VisitTypeDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            VisitTypeResponse visitTypeResponse = (VisitTypeResponse)baseModelResponse;
            return visitTypeResponse;
        }
    }
}
