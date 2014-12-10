using System.Collections.Generic;
using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class AuditPaymentController : ApiController
    {
        [HttpPost]
        public PaymentResponse GetAllAuditPayment(AuditRequest request)
        {
            DBFacade facade = new AuditPaymentDal();
            BaseModelResponse baseModelResponse =facade.GetByCriteria(request);
            PaymentResponse bookingResponse = (PaymentResponse)baseModelResponse;
            PaymentResponse response = TransformResultSet(bookingResponse.AuditPaymentList);
            return response;
        }

        private PaymentResponse TransformResultSet(List<AuditPayment> payments)
        {
            PaymentResponse response = new PaymentResponse();
            List<AuditDisplay> auditList = new List<AuditDisplay>();
            int counter = 0;
            foreach (AuditPayment each in payments)
            {
                each.RowCounter = ++counter;
                if (!string.IsNullOrEmpty(each.PaymentType))
                    auditList.Add(SetProperty("PaymentType", each.PaymentType, each));
                if (!string.IsNullOrEmpty(each.Pricing))
                    auditList.Add(SetProperty("Pricing", each.Pricing, each));
                if (!string.IsNullOrEmpty(each.Amount))
                    auditList.Add(SetProperty("Amount", each.Amount, each));
                if (!string.IsNullOrEmpty(each.PaymentLocation))
                    auditList.Add(SetProperty("PaymentLocation", each.PaymentLocation, each));
                if (!string.IsNullOrEmpty(each.OfficerId))
                    auditList.Add(SetProperty("OfficerId", each.OfficerId, each));
                if (!string.IsNullOrEmpty(each.ReceiptNo))
                    auditList.Add(SetProperty("ReceiptNo", each.ReceiptNo, each));
                if (!string.IsNullOrEmpty(each.ExtraAmountCharge))
                    auditList.Add(SetProperty("ExtraAmountCharge", each.ExtraAmountCharge, each));
                if (!string.IsNullOrEmpty(each.ExtraAmountReason))
                    auditList.Add(SetProperty("ExtraAmountReason", each.ExtraAmountReason, each));
                if (!string.IsNullOrEmpty(each.ExtraAmountReceipt))
                    auditList.Add(SetProperty("ExtraAmountReceipt", each.ExtraAmountReceipt, each));
                if (!string.IsNullOrEmpty(each.PaymentStatus))
                    auditList.Add(SetProperty("PaymentStatus", each.PaymentStatus, each));
                if (!string.IsNullOrEmpty(each.EasyPaisaTranNo))
                    auditList.Add(SetProperty("EasyPaisaTranNo", each.EasyPaisaTranNo, each));
                if (!string.IsNullOrEmpty(each.IsActive))
                    auditList.Add(SetProperty("IsActive", each.IsActive, each));
                if (!string.IsNullOrEmpty(each.ModifiedBy))
                    auditList.Add(SetProperty("ModifiedBy", each.ModifiedBy, each));
                if (!string.IsNullOrEmpty(each.ModifiedDate))
                    auditList.Add(SetProperty("ModifiedDate", each.ModifiedDate, each));
            }
            response.AuditPaymentDisplayList = auditList;
            return response;
        }

        private AuditDisplay SetProperty(string propName, string propVal, AuditPayment audit)
        {
            return new AuditDisplay
            {
                BookingId = audit.Id,
                PropertyName = propName,
                OldValue = propVal.Split('^')[0],
                NewValue = propVal.Split('^')[1],
                ActualModifiedDate = audit.ActualModifiedDate,
                RowCounter = audit.RowCounter,
                UserName = audit.UserName
            };
        }
    }
}
