using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.DAL
{
    public class RefundBookingDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetRefundBookingById";
        }

        protected override string GetAllSql()
        {
            return "GetAllRefundBooking";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            RefundBooking refundBooking = baseModel as RefundBooking;
            dictionary.Add("@BookingId", refundBooking.BookingId);
            dictionary.Add("@RefundOfficeLocation", refundBooking.RefundOfficeLocation);
            dictionary.Add("@RefundTypeId", refundBooking.RefundTypeId);
            return "GetRefundBookingByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            RefundBooking refundBooking = baseModel as RefundBooking;
            dictionary.Add("@BookingId", refundBooking.BookingId);
            dictionary.Add("@RefundTypeId", refundBooking.RefundTypeId);
            dictionary.Add("@RefundReason", refundBooking.RefundReason);
            dictionary.Add("@ActualBookingAmount", refundBooking.ActualBookingAmount);
            dictionary.Add("@RefundAmount", refundBooking.RefundAmount);
            dictionary.Add("@RefundReceipt", refundBooking.RefundReceipt);
            dictionary.Add("@RefundOfficeLocation", refundBooking.RefundOfficeLocation);
            dictionary.Add("@RefundOfficer", refundBooking.RefundOfficer);

            base.ExecuteSql(refundBooking, dictionary);
            return "dbo.SaveRefundBooking";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            RefundBookingResponse response = new RefundBookingResponse();
            RefundBooking refundBooking = null;
            if (dr.Read())
            {
                refundBooking = new RefundBooking();
                MapValues(refundBooking, dr);
            }
            response.RefundBookingModel = refundBooking;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            RefundBookingResponse response = new RefundBookingResponse();
            RefundBooking refundBooking = null;
            List<RefundBooking> refundBookinges = new List<RefundBooking>();
            while (dr.Read())
            {
                refundBooking = new RefundBooking();
                MapValues(refundBooking, dr);
                refundBookinges.Add(refundBooking);
            }
            response.RefundBookingList = refundBookinges;
            return response;
        }

        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            return null;
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            return string.Empty;
        }

        protected override string GetCountSql()
        {
            return string.Empty;
        }

        protected override void MapValues(BaseModel baseModel, IDataReader dr)
        {
            base.MapValues(baseModel, dr);
            RefundBooking refundBooking = baseModel as RefundBooking;
            if (!dr.IsDBNull(dr.GetOrdinal("BookingId")))
                refundBooking.BookingId = dr.GetInt32(dr.GetOrdinal("BookingId"));
            if (!dr.IsDBNull(dr.GetOrdinal("ActualBookingAmount")))
                refundBooking.ActualBookingAmount = dr.GetDecimal(dr.GetOrdinal("ActualBookingAmount"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundAmount")))
                refundBooking.RefundAmount = dr.GetDecimal(dr.GetOrdinal("RefundAmount"));
            if (!dr.IsDBNull(dr.GetOrdinal("AmountDeducted")))
                refundBooking.AmountDeducted = dr.GetDecimal(dr.GetOrdinal("AmountDeducted"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundOfficeLocation")))
                refundBooking.RefundOfficeLocation = dr.GetInt32(dr.GetOrdinal("RefundOfficeLocation"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundReason")))
                refundBooking.RefundReason = dr.GetString(dr.GetOrdinal("RefundReason"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundReceipt")))
                refundBooking.RefundReceipt = dr.GetString(dr.GetOrdinal("RefundReceipt"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundTypeId")))
                refundBooking.RefundTypeId = dr.GetInt32(dr.GetOrdinal("RefundTypeId"));
            if (!dr.IsDBNull(dr.GetOrdinal("RefundOfficer")))
                refundBooking.RefundOfficer = dr.GetInt32(dr.GetOrdinal("RefundOfficer"));

        }
    }
}