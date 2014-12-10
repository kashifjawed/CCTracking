using System;
using System.Collections.Generic;
using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class AuditRefundBookingController : ApiController
    {
        [HttpPost]
        public RefundBookingResponse GetAllAuditPayment(AuditRequest request)
        {
            DBFacade facade = new AuditRefundBookingDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(request);
            RefundBookingResponse bookingResponse = (RefundBookingResponse)baseModelResponse;
            RefundBookingResponse response = TransformResultSet(bookingResponse.AuditRefundBookingList);
            return response;
        }

        private RefundBookingResponse TransformResultSet(List<AuditRefundBooking> refunds)
        {
            RefundBookingResponse response = new RefundBookingResponse();
            List<AuditDisplay> auditList = new List<AuditDisplay>();
            int counter = 0;
            foreach (AuditRefundBooking each in refunds)
            {
                each.RowCounter = ++counter;
                if (!string.IsNullOrEmpty(each.BookingId))
                    auditList.Add(SetProperty("BookingId", each.BookingId, each));
                if (!string.IsNullOrEmpty(each.ActualBookingAmount))
                    auditList.Add(SetProperty("ActualBookingAmount", each.ActualBookingAmount, each));
                if (!string.IsNullOrEmpty(each.RefundOfficeLocation))
                    auditList.Add(SetProperty("RefundOfficeLocation", each.RefundOfficeLocation, each));
                if (!string.IsNullOrEmpty(each.RefundTypeId))
                    auditList.Add(SetProperty("RefundTypeId", each.RefundTypeId, each));
                if (!string.IsNullOrEmpty(each.RefundAmount))
                    auditList.Add(SetProperty("RefundAmount", each.RefundAmount, each));
                if (!string.IsNullOrEmpty(each.RefundReason))
                    auditList.Add(SetProperty("RefundReason", each.RefundReason, each));
                if (!string.IsNullOrEmpty(each.RefundReceipt))
                    auditList.Add(SetProperty("RefundReceipt", each.RefundReceipt, each));
                if (!string.IsNullOrEmpty(each.RefundOfficer))
                    auditList.Add(SetProperty("RefundOfficer", each.RefundOfficer, each));
                if (!string.IsNullOrEmpty(each.IsActive))
                    auditList.Add(SetProperty("IsActive", each.IsActive, each));
                if (!string.IsNullOrEmpty(each.ModifiedBy))
                    auditList.Add(SetProperty("ModifiedBy", each.ModifiedBy, each));
                if (!string.IsNullOrEmpty(each.ModifiedDate))
                    auditList.Add(SetProperty("ModifiedDate", each.ModifiedDate, each));
            }
            response.AuditRefundBookingDisplayList = auditList;
            return response;
        }

        private AuditDisplay SetProperty(string propName, string propVal, AuditRefundBooking audit)
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
