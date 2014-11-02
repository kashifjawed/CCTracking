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
    public class BookingLeftDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            
            return "";
        }

        protected override string GetAllSql()
        {
            return "";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            BookingLeft bookingLeft = baseModel as BookingLeft;
            dictionary.Add("@OfficerId", bookingLeft.OfficerId);
            return "GetBookingStatstics";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {            
            return "";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            BookingLeftResponse response = new BookingLeftResponse();
            BookingLeft bookingLeft = null;
            if (dr.Read())
            {
                bookingLeft = new BookingLeft();
                MapValues(bookingLeft, dr);
            }
            response.BookingLeftModel = bookingLeft;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BookingLeftResponse response = new BookingLeftResponse();
            BookingLeft bookingLeft = null;
            List<BookingLeft> bookingLeftes = new List<BookingLeft>();
            while (dr.Read())
            {
                bookingLeft = new BookingLeft();
                MapValues(bookingLeft, dr);
            }
            response.BookingLeftModel = bookingLeft;
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
            //base.MapValues(baseModel, dr);
            BookingLeft bookingLeft = baseModel as BookingLeft;
            if (!dr.IsDBNull(dr.GetOrdinal("TodaysBooking")))
                bookingLeft.TodaysBooking = dr.GetInt32(dr.GetOrdinal("TodaysBooking"));
            if (!dr.IsDBNull(dr.GetOrdinal("UserTotalBooking")))
                bookingLeft.UserTotalBooking = dr.GetInt32(dr.GetOrdinal("UserTotalBooking"));
            if (!dr.IsDBNull(dr.GetOrdinal("UserPiadBooking")))
                bookingLeft.UserPiadBooking = dr.GetInt32(dr.GetOrdinal("UserPiadBooking"));
            if (!dr.IsDBNull(dr.GetOrdinal("UserUnpaidBooking")))
                bookingLeft.UserUnpaidBooking = dr.GetInt32(dr.GetOrdinal("UserUnpaidBooking"));
        }
    }
}
