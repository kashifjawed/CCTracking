using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class RefundTypeController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.RefundType SaveRefundType(CCTracking.Dto.RefundType refundType)
        {
            if (refundType != null)
            {
                DBFacade facade = new RefundTypeDal();
                if (refundType.Id <= 0)
                {
                    refundType.CreatedDate = refundType.ModifiedDate = DateTime.Today;
                    refundType.CreatedBy = refundType.ModifiedBy;
                }
                else
                {
                    refundType.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(refundType);
                refundType = ((RefundTypeResponse)centreResponse).RefundTypeModel;
            }
            return refundType;
        }

        [HttpGet]
        public LookupResponse RefundTypeDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public RefundTypeResponse GetAll(string a)
        {
            DBFacade facade = new RefundTypeDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            RefundTypeResponse refundTypeResponse = (RefundTypeResponse)baseModelResponse;
            return refundTypeResponse;
        }
        
        [HttpGet]
        public RefundTypeResponse GetById(int id)
        {
            DBFacade facade = new RefundTypeDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            RefundTypeResponse refundTypeResponse = (RefundTypeResponse)baseModelResponse;
            return refundTypeResponse;
        }
    }
}
