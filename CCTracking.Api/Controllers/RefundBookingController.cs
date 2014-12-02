using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class RefundBookingController : ApiController
    {
        [HttpPost]
        public CCTracking.Dto.RefundBooking SaveRefundBooking(CCTracking.Dto.RefundBooking refundBooking)
        {
            if (refundBooking != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new CCTracking.DAL.RefundBookingDal();
                if (refundBooking.Id <= 0)
                {
                    refundBooking.CreatedDate = refundBooking.ModifiedDate = DateTime.Today;
                    refundBooking.CreatedBy = refundBooking.ModifiedBy;
                }
                else
                {
                    refundBooking.ModifiedDate = DateTime.Today;
                }
                refundBooking.AmountDeducted = refundBooking.ActualBookingAmount - refundBooking.RefundAmount;
                BaseModelResponse refundBookingResponse = facade.Execute(refundBooking);

                if (!string.IsNullOrEmpty(refundBookingResponse.ErrorMessage))
                {
                    refundBooking.ErrorMessage = refundBookingResponse.ErrorMessage;
                }
                else
                {
                    refundBooking = ((RefundBookingResponse)refundBookingResponse).RefundBookingModel;
                }
            }
            return refundBooking;
        }

        [HttpGet]
        public LookupResponse RefundBookingDefault()
        {
            DBFacade facade = new CCTracking.DAL.LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        //[HttpGet]
        //public CentreResponse GetAll(string a)
        //{
        //    DBFacade facade = new CCTracking.DAL.CentreDal();
        //    BaseModelResponse baseModelResponse = facade.GetAll();
        //    CentreResponse centreResponse = (CentreResponse)baseModelResponse;
        //    return centreResponse;
        //}

        [HttpGet]
        public RefundBookingResponse GetById(int id)
        {
            DBFacade facade = new CCTracking.DAL.RefundBookingDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            RefundBookingResponse refundBookingResponse = (RefundBookingResponse)baseModelResponse;
            return refundBookingResponse;
        }
    }
}
