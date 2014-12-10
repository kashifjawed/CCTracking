using System;
using System.Collections.Generic;
using System.Data;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class AuditBookingDal : DBFacade
    {
        protected override BaseModelResponse ConvertToModel(System.Data.IDataReader dr)
        {
            throw new NotImplementedException();
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BookingResponse response = new BookingResponse();
            AuditBooking booking = null;
            List<AuditBooking> bookings = new List<AuditBooking>();
            while (dr.Read())
            {
                booking = new AuditBooking();
                MapValues(booking, dr);
                bookings.Add(booking);
            }
            response.AuditBookingList = bookings;
            return response;
        }

        protected override Dto.Response.BaseModelResponse ConvertToList(System.Data.DataSet ds)
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
            return "[dbo].[Audit_Booking]";
        }

        protected virtual void MapValues(BaseModel baseModel, IDataReader dr)
        {
            //base.MapValues(baseModel, dr);
            AuditBooking booking = baseModel as AuditBooking;

            if (dr.IsColumnExists("opType"))
                booking.OperationType = dr.GetInt32(dr.GetOrdinal("opType"));

            if (dr.IsColumnExists("Id"))
                booking.Id = dr.GetInt32(dr.GetOrdinal("Id"));

            if (dr.IsColumnExists("UserName") && !dr.IsDBNull(dr.GetOrdinal("UserName")))
                booking.UserName = dr.GetString(dr.GetOrdinal("UserName"));

            if (dr.IsColumnExists("ContactName") && !dr.IsDBNull(dr.GetOrdinal("ContactName")))
                booking.ContactName = dr.GetString(dr.GetOrdinal("ContactName"));

            if (dr.IsColumnExists("ContactMobile") && !dr.IsDBNull(dr.GetOrdinal("ContactMobile")))
                booking.ContactMobile = dr.GetString(dr.GetOrdinal("ContactMobile"));

            if (dr.IsColumnExists("ContactNic") && !dr.IsDBNull(dr.GetOrdinal("ContactNic")))
                booking.ContactNic = dr.GetString(dr.GetOrdinal("ContactNic"));

            if (dr.IsColumnExists("DeseasedName") && !dr.IsDBNull(dr.GetOrdinal("DeseasedName")))
                booking.DeseasedName = dr.GetString(dr.GetOrdinal("DeseasedName"));

            if (dr.IsColumnExists("DeseasedAge") && !dr.IsDBNull(dr.GetOrdinal("DeseasedAge")))
                booking.DeseasedAge = dr.GetString(dr.GetOrdinal("DeseasedAge"));

            if (dr.IsColumnExists("DeseasedGender") && !dr.IsDBNull(dr.GetOrdinal("DeseasedGender")))
                booking.DeseasedGender = dr.GetString(dr.GetOrdinal("DeseasedGender"));

            if (dr.IsColumnExists("CauseOfDeath") && !dr.IsDBNull(dr.GetOrdinal("CauseOfDeath")))
                booking.CauseOfDeath = dr.GetString(dr.GetOrdinal("CauseOfDeath"));

            if (dr.IsColumnExists("Address") && !dr.IsDBNull(dr.GetOrdinal("Address")))
                booking.Address = dr.GetString(dr.GetOrdinal("Address"));

            if (dr.IsColumnExists("BusPoint") && !dr.IsDBNull(dr.GetOrdinal("BusPoint")))
                booking.BusPoint = dr.GetString(dr.GetOrdinal("BusPoint"));

            if (dr.IsColumnExists("LandmarkId") && !dr.IsDBNull(dr.GetOrdinal("LandmarkId")))
                booking.LandmarkId = dr.GetString(dr.GetOrdinal("LandmarkId"));

            if (dr.IsColumnExists("UnionCouncilId") && !dr.IsDBNull(dr.GetOrdinal("UnionCouncilId")))
                booking.UnionCouncilId = dr.GetString(dr.GetOrdinal("UnionCouncilId"));

            if (dr.IsColumnExists("TownId") && !dr.IsDBNull(dr.GetOrdinal("TownId")))
                booking.TownId = dr.GetString(dr.GetOrdinal("TownId"));

            if (dr.IsColumnExists("PickupDate") && !dr.IsDBNull(dr.GetOrdinal("PickupDate")))
                booking.PickupDate = dr.GetString(dr.GetOrdinal("PickupDate"));

            if (dr.IsColumnExists("PickupTime") && !dr.IsDBNull(dr.GetOrdinal("PickupTime")))
                booking.PickupTime = dr.GetString(dr.GetOrdinal("PickupTime"));

            if (dr.IsColumnExists("ReturnTime") && !dr.IsDBNull(dr.GetOrdinal("ReturnTime")))
                booking.ReturnTime = dr.GetString(dr.GetOrdinal("ReturnTime"));

            if (dr.IsColumnExists("GraveyardId") && !dr.IsDBNull(dr.GetOrdinal("GraveyardId")))
                booking.GraveyardId = dr.GetString(dr.GetOrdinal("GraveyardId"));

            if (dr.IsColumnExists("NamazEJanazaHeldIn") && !dr.IsDBNull(dr.GetOrdinal("NamazEJanazaHeldIn")))
                booking.NamazEJanazaHeldIn = dr.GetString(dr.GetOrdinal("NamazEJanazaHeldIn"));

            if (dr.IsColumnExists("NamazEJanazaLocation") && !dr.IsDBNull(dr.GetOrdinal("NamazEJanazaLocation")))
                booking.NamazEJanazaLocation = dr.GetString(dr.GetOrdinal("NamazEJanazaLocation"));

            if (dr.IsColumnExists("MasjidName") && !dr.IsDBNull(dr.GetOrdinal("MasjidName")))
                booking.MasjidName = dr.GetString(dr.GetOrdinal("MasjidName"));

            if (dr.IsColumnExists("OtherDetail") && !dr.IsDBNull(dr.GetOrdinal("OtherDetail")))
                booking.OtherDetail = dr.GetString(dr.GetOrdinal("OtherDetail"));

            if (dr.IsColumnExists("IsActive") && !dr.IsDBNull(dr.GetOrdinal("IsActive")))
                booking.IsActive = dr.GetString(dr.GetOrdinal("IsActive"));

            if (dr.IsColumnExists("ModifiedBy") && !dr.IsDBNull(dr.GetOrdinal("ModifiedBy")))
                booking.ModifiedBy = dr.GetString(dr.GetOrdinal("ModifiedBy"));
            if (dr.IsColumnExists("ModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ModifiedDate")))
                booking.ModifiedDate = dr.GetString(dr.GetOrdinal("ModifiedDate"));

            if (dr.IsColumnExists("ActualModifiedDate") && !dr.IsDBNull(dr.GetOrdinal("ActualModifiedDate")))
                booking.ActualModifiedDate = dr.GetDateTime(dr.GetOrdinal("ActualModifiedDate"));
        }
    }
}
