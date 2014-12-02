using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class PaymentController : ApiController
    {
        [HttpPost]
        public Payment SaveBooking(Payment payment)
        {
            if (payment != null)
            {
                if (payment.Id <= 0)
                {
                    payment.CreatedDate = payment.ModifiedDate = DateTime.Today;
                    payment.CreatedBy = payment.ModifiedBy;
                    
                    //for new record, payment through easyPaisa is unpaid
                    if ((PaymentTypes)payment.PaymentType == PaymentTypes.EasyPaisa)
                    {
                        payment.PaymentStatus = 0;
                    }
                    else
                    {
                        payment.PaymentStatus = 1;
                        payment.EasyPaisaTranNo = string.Empty;
                    }
                }
                else //edit
                {
                    if (((PaymentTypes)payment.PaymentType == PaymentTypes.Cash) || ((PaymentTypes)payment.PaymentType == PaymentTypes.EasyPaisa && !string.IsNullOrEmpty(payment.EasyPaisaTranNo)))
                    {
                        payment.PaymentStatus = 1;
                    }
                    else
                    {
                        payment.EasyPaisaTranNo = string.Empty;
                    }
                    payment.ModifiedDate = DateTime.Today;
                }

                DalService service = new DalService();
                BaseModelResponse paymentResponse = service.SavePayment(payment);
                if (!string.IsNullOrEmpty(paymentResponse.ErrorMessage))
                {
                    payment.ErrorMessage = paymentResponse.ErrorMessage;
                }
                else
                {
                    payment = ((PaymentResponse) paymentResponse).PaymentModel;
                }


            }
            return payment;
        }
        [HttpGet]
        public PaymentResponse GetById(int id)
        {
            PaymentResponse paymentResponse = null;
            if (id > 0)
            {                
                DalService service = new DalService();
                BaseModelResponse baseModelResponse = service.GetPaymentById(id);
                paymentResponse = (PaymentResponse)baseModelResponse;
            }
            return paymentResponse;
        }


    }
}
