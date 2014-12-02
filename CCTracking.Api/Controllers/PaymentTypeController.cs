using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class PaymentTypeController : ApiController
    {        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.PaymentType SavePaymentType(CCTracking.Dto.PaymentType paymentType)
        {
            if (paymentType != null)
            {
                DBFacade facade = new PaymentTypeDal();
                if (paymentType.Id <= 0)
                {
                    paymentType.CreatedDate = paymentType.ModifiedDate = DateTime.Today;
                    paymentType.CreatedBy = paymentType.ModifiedBy;
                }
                else
                {
                    paymentType.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(paymentType);
                paymentType = ((PaymentTypeResponse)centreResponse).PaymentTypeModel;
            }
            return paymentType;
        }

        [HttpGet]
        public LookupResponse PaymentTypeDefault()
        {
            DBFacade facade = new LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public PaymentTypeResponse GetAll(string a)
        {
            DBFacade facade = new PaymentTypeDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            PaymentTypeResponse paymentTypeResponse = (PaymentTypeResponse)baseModelResponse;
            return paymentTypeResponse;
        }
        
        [HttpGet]
        public PaymentTypeResponse GetById(int id)
        {
            DBFacade facade = new PaymentTypeDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            PaymentTypeResponse paymentTypeResponse = (PaymentTypeResponse)baseModelResponse;
            return paymentTypeResponse;
        }
    }
}
