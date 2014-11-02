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
    public class BusVisitDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetBusVisitById";
        }

        protected override string GetAllSql()
        {
            return "GetAllBusVisit";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            BusVisit busVisit = baseModel as BusVisit;

            //dictionary.Add("@CentreId", busVisit.CentreId);
            //dictionary.Add("@BusId", busVisit.BusId);
            //dictionary.Add("@BookingId", busVisit.BookingId);
            //dictionary.Add("@VisitTypeId", busVisit.VisitTypeId);
            //dictionary.Add("@DriverId", busVisit.DriverId);
            //dictionary.Add("@IsAvailableForBooking", busVisit.IsAvailableForBooking);
            //dictionary.Add("@IsAvailableForFutureBooking", busVisit.IsAvailableForFutureBooking);
            //return "GetBusVisitByCriteria";

            dictionary.Add("@BookingId", busVisit.BookingId);
            return "GetBusVisitByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            BusVisit busVisit = baseModel as BusVisit;
            dictionary.Add("@CentreId", busVisit.CentreId);
            dictionary.Add("@BusId", busVisit.BusId);
            dictionary.Add("@DriverId", busVisit.DriverId);
            dictionary.Add("@VisitTypeId", busVisit.VisitTypeId);
            dictionary.Add("@BookingId", busVisit.BookingId);
            dictionary.Add("@InchargeName", busVisit.InchargeName);
            dictionary.Add("@VisitDate", busVisit.VisitDate);
            dictionary.Add("@OutTime", busVisit.OutTime);
            dictionary.Add("@ReturnTime", busVisit.ReturnTime);
            dictionary.Add("@ReadingWhenFilling", busVisit.ReadingWhenFilling);
            dictionary.Add("@PumpLocation", busVisit.PumpLocation);
            dictionary.Add("@FuelRate", busVisit.FuelRate);
            dictionary.Add("@FuelAmount", busVisit.FuelAmount);
            dictionary.Add("@IsBookingCompleted", busVisit.IsBookingCompleted);
            dictionary.Add("@InitialReading", busVisit.InitialReading);
            dictionary.Add("@FinalReading", busVisit.FinalReading);
            dictionary.Add("@Description", busVisit.Description);
            base.ExecuteSql(busVisit, dictionary);
            return "dbo.SaveBusVisit";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            BusVisitResponse response = new BusVisitResponse();
            BusVisit busVisit = null;
            if (dr.Read())
            {
                busVisit = new BusVisit();
                MapValues(busVisit, dr);
            }
            response.BusVisitModel = busVisit;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BusVisitResponse response = new BusVisitResponse();
            BusVisit busVisit = null;
            List<BusVisit> busVisits = new List<BusVisit>();
            while (dr.Read())
            {
                busVisit = new BusVisit();
                MapValues(busVisit, dr);
                busVisits.Add(busVisit);
            }
            response.BusVisitList = busVisits;
            return response;
        }

        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            return null;
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "DelBusVisitById";
        }

        protected override string GetCountSql()
        {
            return "GetBusVisitCount";
        }

        protected override void MapValues(BaseModel baseModel, IDataReader dr)
        {
            base.MapValues(baseModel, dr);
            BusVisit busVisit = baseModel as BusVisit;

            if (!dr.IsDBNull(dr.GetOrdinal("CentreId")))
                busVisit.CentreId = dr.GetInt32(dr.GetOrdinal("CentreId"));
            if (!dr.IsDBNull(dr.GetOrdinal("BusId")))
                busVisit.BusId = dr.GetInt32(dr.GetOrdinal("BusId"));
            if (!dr.IsDBNull(dr.GetOrdinal("DriverId")))
                busVisit.DriverId = dr.GetInt32(dr.GetOrdinal("DriverId"));
            if (!dr.IsDBNull(dr.GetOrdinal("VisitTypeId")))
                busVisit.VisitTypeId = dr.GetInt32(dr.GetOrdinal("VisitTypeId"));
            if (!dr.IsDBNull(dr.GetOrdinal("BookingId")))
                busVisit.BookingId = dr.GetInt32(dr.GetOrdinal("BookingId"));
            if (!dr.IsDBNull(dr.GetOrdinal("InchargeName")))
                busVisit.InchargeName = dr.GetString(dr.GetOrdinal("InchargeName"));
            if (!dr.IsDBNull(dr.GetOrdinal("VisitDate")))
                busVisit.VisitDate = dr.GetDateTime(dr.GetOrdinal("VisitDate"));
            if (!dr.IsDBNull(dr.GetOrdinal("OutTime")))
                busVisit.OutTime = dr.GetByte(dr.GetOrdinal("OutTime"));
            if (!dr.IsDBNull(dr.GetOrdinal("ReturnTime")))
                busVisit.ReturnTime = dr.GetByte(dr.GetOrdinal("ReturnTime"));
            if (!dr.IsDBNull(dr.GetOrdinal("ReadingWhenFilling")))
                busVisit.ReadingWhenFilling = dr.GetInt64(dr.GetOrdinal("ReadingWhenFilling"));
            if (!dr.IsDBNull(dr.GetOrdinal("PumpLocation")))
                busVisit.PumpLocation = dr.GetString(dr.GetOrdinal("PumpLocation"));
            if (!dr.IsDBNull(dr.GetOrdinal("FuelRate")))
                busVisit.FuelRate = dr.GetDecimal(dr.GetOrdinal("FuelRate"));
            if (!dr.IsDBNull(dr.GetOrdinal("FuelAmount")))
                busVisit.FuelAmount = dr.GetDecimal(dr.GetOrdinal("FuelAmount"));
            if (!dr.IsDBNull(dr.GetOrdinal("IsBookingCompleted")))
                busVisit.IsBookingCompleted = dr.GetBoolean(dr.GetOrdinal("IsBookingCompleted"));
            if (!dr.IsDBNull(dr.GetOrdinal("InitialReading")))
                busVisit.InitialReading = dr.GetInt64(dr.GetOrdinal("InitialReading"));
            if (!dr.IsDBNull(dr.GetOrdinal("FinalReading")))
                busVisit.FinalReading = dr.GetInt64(dr.GetOrdinal("FinalReading"));
            if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                busVisit.Description = dr.GetString(dr.GetOrdinal("Description"));
            if (!dr.IsDBNull(dr.GetOrdinal("visitType")))
                busVisit.VisitTypeDesc = dr.GetString(dr.GetOrdinal("visitType"));
            if (!dr.IsDBNull(dr.GetOrdinal("busDesc")))
                busVisit.BusDesc = dr.GetString(dr.GetOrdinal("busDesc"));
            if (!dr.IsDBNull(dr.GetOrdinal("driverDesc")))
                busVisit.DriverDesc = dr.GetString(dr.GetOrdinal("driverDesc"));
            if (!dr.IsDBNull(dr.GetOrdinal("centreDesc")))
                busVisit.CentreDesc = dr.GetString(dr.GetOrdinal("centreDesc"));
        }
    }
}