using System;
using System.Collections.Generic;
using System.Data;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class AuditPaymentDal:DBFacade
    {
        protected override BaseModelResponse ConvertToModel(System.Data.IDataReader dr)
        {
            throw new NotImplementedException();
        }

        protected override BaseModelResponse ConvertToList(System.Data.IDataReader dr)
        {
            PaymentResponse response = new PaymentResponse();
            AuditPayment payment = null;
            List<AuditPayment> bookings = new List<AuditPayment>();
            while (dr.Read())
            {
                payment = new AuditPayment();
                MapValues(payment, dr);
                bookings.Add(payment);
            }
            response.AuditPaymentList = bookings;
            return response;
        }

        protected override BaseModelResponse ConvertToList(System.Data.DataSet ds)
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
            return "[dbo].[Audit_Payment]";
        }
        protected virtual void MapValues(BaseModel baseModel, IDataReader dr)
        {
            AuditPayment payment = baseModel as AuditPayment;

            if (dr.IsColumnExists("opType"))
                payment.OperationType = dr.GetInt32(dr.GetOrdinal("opType"));

            if (dr.IsColumnExists("Id"))
                payment.Id = dr.GetInt32(dr.GetOrdinal("Id"));

            if (dr.IsColumnExists("UserName") && !dr.IsDBNull(dr.GetOrdinal("UserName")))
                payment.UserName = dr.GetString(dr.GetOrdinal("UserName"));

            if (dr.IsColumnExists("PaymentType") && !dr.IsDBNull(dr.GetOrdinal("PaymentType")))
                payment.PaymentType = dr.GetString(dr.GetOrdinal("PaymentType"));

            if (dr.IsColumnExists("Pricing") && !dr.IsDBNull(dr.GetOrdinal("Pricing")))
                payment.Pricing = dr.GetString(dr.GetOrdinal("Pricing"));

            if (dr.IsColumnExists("Amount") && !dr.IsDBNull(dr.GetOrdinal("Amount")))
                payment.Amount = dr.GetString(dr.GetOrdinal("Amount"));

            if (dr.IsColumnExists("PaymentLocation") && !dr.IsDBNull(dr.GetOrdinal("PaymentLocation")))
                payment.PaymentLocation = dr.GetString(dr.GetOrdinal("PaymentLocation"));

            if (dr.IsColumnExists("OfficerId") && !dr.IsDBNull(dr.GetOrdinal("OfficerId")))
                payment.OfficerId = dr.GetString(dr.GetOrdinal("OfficerId"));

            if (dr.IsColumnExists("ReceiptNo") && !dr.IsDBNull(dr.GetOrdinal("ReceiptNo")))
                payment.ReceiptNo = dr.GetString(dr.GetOrdinal("ReceiptNo"));

            if (dr.IsColumnExists("ExtraAmountCharge") && !dr.IsDBNull(dr.GetOrdinal("ExtraAmountCharge")))
                payment.ExtraAmountCharge = dr.GetString(dr.GetOrdinal("ExtraAmountCharge"));

            if (dr.IsColumnExists("ExtraAmountReason") && !dr.IsDBNull(dr.GetOrdinal("ExtraAmountReason")))
                payment.ExtraAmountReason = dr.GetString(dr.GetOrdinal("ExtraAmountReason"));

            if (dr.IsColumnExists("ExtraAmountReceipt") && !dr.IsDBNull(dr.GetOrdinal("ExtraAmountReceipt")))
                payment.ExtraAmountReceipt = dr.GetString(dr.GetOrdinal("ExtraAmountReceipt"));

            if (dr.IsColumnExists("PaymentStatus") && !dr.IsDBNull(dr.GetOrdinal("PaymentStatus")))
                payment.PaymentStatus = dr.GetString(dr.GetOrdinal("PaymentStatus"));

            if (dr.IsColumnExists("EasyPaisaTranNo") && !dr.IsDBNull(dr.GetOrdinal("EasyPaisaTranNo")))
                payment.EasyPaisaTranNo = dr.GetString(dr.GetOrdinal("EasyPaisaTranNo"));

            if (dr.IsColumnExists("IsActive") && !dr.IsDBNull(dr.GetOrdinal("IsActive")))
                payment.IsActive = dr.GetString(dr.GetOrdinal("IsActive"));

            if (dr.IsColumnExists("ModifiedBy") && !dr.IsDBNull(dr.GetOrdinal("ModifiedBy")))
                payment.ModifiedBy = dr.GetString(dr.GetOrdinal("ModifiedBy"));
            if (dr.IsColumnExists("ModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ModifiedDate")))
                payment.ModifiedDate = dr.GetString(dr.GetOrdinal("ModifiedDate"));

            if (dr.IsColumnExists("ActualModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ActualModifiedDate")))
                payment.ActualModifiedDate = dr.GetDateTime(dr.GetOrdinal("ActualModifiedDate"));
        }
    }
}
