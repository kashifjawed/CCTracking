using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class AuditRefundBookingDal:DBFacade
    {

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            throw new NotImplementedException();
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            RefundBookingResponse response = new RefundBookingResponse();
            AuditRefundBooking refundBooking = null;
            List<AuditRefundBooking> refunds = new List<AuditRefundBooking>();
            while (dr.Read())
            {
                refundBooking = new AuditRefundBooking();
                MapValues(refundBooking, dr);
                refunds.Add(refundBooking);
            }
            response.AuditRefundBookingList = refunds;
            return response;
        }

        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            throw new NotImplementedException();
        }

        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            throw new NotImplementedException();
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            throw new NotImplementedException();
        }

        protected override string GetCountSql()
        {
            throw new NotImplementedException();
        }

        protected override string GetAllSql()
        {
            throw new NotImplementedException();
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            AuditRequest auditRequest = (AuditRequest)baseModel;
            dictionary.Add("@FromDate", auditRequest.FromDate);
            dictionary.Add("@ToDate", auditRequest.ToDate);
            return "[dbo].[Audit_RefundBooking]";
        }
        protected virtual void MapValues(BaseModel baseModel, IDataReader dr)
        {
            AuditRefundBooking refundBooking = baseModel as AuditRefundBooking;

            if (dr.IsColumnExists("opType"))
                refundBooking.OperationType = dr.GetInt32(dr.GetOrdinal("opType"));

            if (dr.IsColumnExists("Id"))
                refundBooking.Id = dr.GetInt32(dr.GetOrdinal("Id"));

            if (dr.IsColumnExists("UserName") && !dr.IsDBNull(dr.GetOrdinal("UserName")))
                refundBooking.UserName = dr.GetString(dr.GetOrdinal("UserName"));

            if (dr.IsColumnExists("BookingId") && !dr.IsDBNull(dr.GetOrdinal("BookingId")))
                refundBooking.BookingId = dr.GetString(dr.GetOrdinal("BookingId"));

            if (dr.IsColumnExists("ActualBookingAmount") && !dr.IsDBNull(dr.GetOrdinal("ActualBookingAmount")))
                refundBooking.ActualBookingAmount = dr.GetString(dr.GetOrdinal("ActualBookingAmount"));

            if (dr.IsColumnExists("RefundOfficeLocation") && !dr.IsDBNull(dr.GetOrdinal("RefundOfficeLocation")))
                refundBooking.RefundOfficeLocation = dr.GetString(dr.GetOrdinal("RefundOfficeLocation"));

            if (dr.IsColumnExists("RefundTypeId") && !dr.IsDBNull(dr.GetOrdinal("RefundTypeId")))
                refundBooking.RefundTypeId = dr.GetString(dr.GetOrdinal("RefundTypeId"));

            if (dr.IsColumnExists("RefundAmount") && !dr.IsDBNull(dr.GetOrdinal("RefundAmount")))
                refundBooking.RefundAmount = dr.GetString(dr.GetOrdinal("RefundAmount"));

            if (dr.IsColumnExists("RefundReason") && !dr.IsDBNull(dr.GetOrdinal("RefundReason")))
                refundBooking.RefundReason = dr.GetString(dr.GetOrdinal("RefundReason"));

            if (dr.IsColumnExists("RefundReceipt") && !dr.IsDBNull(dr.GetOrdinal("RefundReceipt")))
                refundBooking.RefundReceipt = dr.GetString(dr.GetOrdinal("RefundReceipt"));

            if (dr.IsColumnExists("RefundOfficer") && !dr.IsDBNull(dr.GetOrdinal("RefundOfficer")))
                refundBooking.RefundOfficer = dr.GetString(dr.GetOrdinal("RefundOfficer"));

            if (dr.IsColumnExists("IsActive") && !dr.IsDBNull(dr.GetOrdinal("IsActive")))
                refundBooking.IsActive = dr.GetString(dr.GetOrdinal("IsActive"));

            if (dr.IsColumnExists("ModifiedBy") && !dr.IsDBNull(dr.GetOrdinal("ModifiedBy")))
                refundBooking.ModifiedBy = dr.GetString(dr.GetOrdinal("ModifiedBy"));
            if (dr.IsColumnExists("ModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ModifiedDate")))
                refundBooking.ModifiedDate = dr.GetString(dr.GetOrdinal("ModifiedDate"));

            if (dr.IsColumnExists("ActualModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ActualModifiedDate")))
                refundBooking.ActualModifiedDate = dr.GetDateTime(dr.GetOrdinal("ActualModifiedDate"));
        }
    }
}
