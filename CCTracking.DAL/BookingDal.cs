using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;


namespace CCTracking.DAL
{
    public class BookingDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("Id", id);
            return "GetBookingById";
        }
        protected override string GetAllSql()
        {
            return "GetAllBooking";
        }
        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {

            SearchCriteria searchCriteria = (SearchCriteria)baseModel;
            var contactInfo = string.IsNullOrEmpty(searchCriteria.ContactInfo) ? null : searchCriteria.ContactInfo;
            var deseasedInfo = string.IsNullOrEmpty(searchCriteria.DeseasedInfo) ? null : searchCriteria.DeseasedInfo;
            //var genderId = searchCriteria.GenderId == 0 ? null : searchCriteria.GenderId;
            dictionary.Add("@ContactInfo", "%" + contactInfo + "%");
            dictionary.Add("@DeseasedInfo", "%" + deseasedInfo + "%");
            dictionary.Add("@GenderId", searchCriteria.GenderId);
            dictionary.Add("@PaymentStatusId", searchCriteria.PaymentStatusId);
            dictionary.Add("@GreveyardId", searchCriteria.GreveyardId);
            dictionary.Add("@CentreId", searchCriteria.CentreId);
            dictionary.Add("@BusId", searchCriteria.BusId);
            return "GetBookingByCriteria";
        }
        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Booking booking = (Booking)baseModel;
            //if (booking.Id == null) dictionary.Add("Id", 0);
            //dictionary.Add("Id", booking.Id);
            dictionary.Add("ContactName", booking.ContactName);
            dictionary.Add("ContactMobile", booking.ContactMobile);
            dictionary.Add("ContactNic", booking.ContactNic);
            dictionary.Add("DeseasedName", booking.DeseasedName);
            dictionary.Add("DeseasedAge", booking.DeseasedAge);
            dictionary.Add("DeseasedGender", booking.DeseasedGender);
            dictionary.Add("CauseOfDeath", booking.CauseOfDeath);
            dictionary.Add("Address", booking.Address);
            dictionary.Add("BusPoint", booking.BusPoint);
            dictionary.Add("LandmarkId", booking.LandmarkId);
            dictionary.Add("UnionCouncilId", booking.UnionCouncilId);
            dictionary.Add("TownId", booking.TownId);
            dictionary.Add("PickupDate", booking.PickupDate);
            dictionary.Add("PickupTime", booking.PickupTime);
            dictionary.Add("ReturnTime", booking.ReturnTime);
            dictionary.Add("GraveyardId", booking.GraveyardId);
            dictionary.Add("NamazEJanazaHeldIn", booking.NamazEJanazaHeldIn);
            dictionary.Add("NamazEJanazaLocation", booking.NamazEJanazaLocation);
            dictionary.Add("MasjidName", booking.MasjidName);
            dictionary.Add("OtherDetail", booking.OtherDetail);
            base.ExecuteSql(booking, dictionary);


            //insert/update query and return updated boject
            //return "update Booking set ContactName=@ContactName where Id=@Id";
            return "dbo.SaveBooking";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            BookingResponse bookingResponse = new BookingResponse();
            Booking booking = null;
            while (dr.Read())
            {
                booking = new Booking();
                MapValues(booking, dr);
                bookingResponse.BookingModel = booking;
            }
            return bookingResponse;
        }
        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BookingResponse bookingResponse = new BookingResponse();
            List<Booking> bookings = new List<Booking>();
            Booking booking = null;
            while (dr.Read())
            {
                booking = new Booking();
                MapValues(booking, dr);
                bookings.Add(booking);
            }
            bookingResponse.BookingList = bookings;
            return bookingResponse;
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
        private void MapValues(Booking booking, IDataReader dr)
        {
            booking.Id = Convert.ToInt32(dr["Id"]);
            booking.ContactName = dr["ContactName"].ToString();
            booking.ContactMobile = dr["ContactMobile"].ToString();
            booking.ContactNic = dr["ContactNic"].ToString();
            booking.DeseasedName = dr["DeseasedName"].ToString();
            booking.DeseasedAge = Convert.ToByte(dr["DeseasedAge"]);
            booking.DeseasedGender = Convert.ToByte(dr["DeseasedGender"]);
            booking.CauseOfDeath = Convert.ToByte(dr["CauseOfDeath"]);
            booking.Address = dr["Address"].ToString();
            booking.BusPoint = dr["BusPoint"] == DBNull.Value ? 0 : Convert.ToInt32(dr["BusPoint"]);
            booking.LandmarkId = dr["LandmarkId"] == DBNull.Value ? 0 : Convert.ToInt32(dr["LandmarkId"]);
            booking.UnionCouncilId = dr["UnionCouncilId"] == DBNull.Value ? 0 : Convert.ToInt32(dr["UnionCouncilId"]);
            booking.TownId = dr["TownId"] == DBNull.Value ? 0 : Convert.ToInt32(dr["TownId"]);
            booking.PickupDate = dr["PickupDate"] == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(dr["PickupDate"]);
            booking.PickupTime = dr["PickupTime"] == DBNull.Value ? Convert.ToByte(0) : Convert.ToByte(dr["PickupTime"]);
            booking.ReturnTime = dr["ReturnTime"] == DBNull.Value ? Convert.ToByte(0) : Convert.ToByte(dr["ReturnTime"]);
            booking.GraveyardId = dr["GraveyardId"] == DBNull.Value ? Convert.ToByte(0) : Convert.ToByte(dr["GraveyardId"]);
            booking.NamazEJanazaHeldIn = dr["NamazEJanazaHeldIn"] == DBNull.Value ? Convert.ToByte(0) : Convert.ToByte(dr["NamazEJanazaHeldIn"]);
            booking.NamazEJanazaLocation = dr["NamazEJanazaLocation"] == DBNull.Value ? "" : dr["NamazEJanazaLocation"].ToString();
            booking.MasjidName = dr["MasjidName"] == DBNull.Value ? "" : dr["MasjidName"].ToString();
            booking.OtherDetail = dr["OtherDetail"].ToString();

        }
    }
}
