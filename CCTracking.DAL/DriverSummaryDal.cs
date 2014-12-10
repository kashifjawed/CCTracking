using System.Data;
using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Collections.Generic;

namespace CCTracking.DAL
{
    public class DriverSummaryDal : DBFacade
    {

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            throw new NotImplementedException();
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            DriverResponse response = new DriverResponse();
            Driver driver = null;
            List<Driver> drivers = new List<Driver>();
            while (dr.Read())
            {
                driver = new Driver();
                MapValues(driver, dr);
                drivers.Add(driver);
            }
            response.DriverList = drivers;
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
            return "dbo.RptDriverSummary";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Driver driver = (Driver)baseModel;
            dictionary.Add("@driverId", driver.Id);
            return "dbo.RptDriverDetail";
        }
        protected virtual void MapValues(BaseModel baseModel, IDataReader dr)
        {
            //base.MapValues(baseModel, dr);
            Driver driver = baseModel as Driver;
            

            
            if(dr.IsColumnExists("DriverId"))
                driver.DriverId = dr.GetInt32(dr.GetOrdinal("DriverId"));

            if (dr.IsColumnExists("DriverName"))
                driver.DriverName = dr.GetString(dr.GetOrdinal("DriverName"));

            if (dr.IsColumnExists("Milage")) 
                driver.Milage = dr.GetString(dr.GetOrdinal("Milage"));

            if (dr.IsColumnExists("VisitCount")) 
                driver.VisitCount = dr.GetInt32(dr.GetOrdinal("VisitCount"));
            
            if(dr.IsColumnExists("vehicleNo"))
                driver.VehicleNo = dr.GetString(dr.GetOrdinal("VehicleNo"));

            if (dr.IsColumnExists("visitDate"))
                driver.VisitDate = dr.GetDateTime(dr.GetOrdinal("visitDate"));

            if (dr.IsColumnExists("visitInterval"))
                driver.VisitInterval = dr.GetString(dr.GetOrdinal("visitInterval"));

            if (dr.IsColumnExists("BookingId"))
                driver.BookingId = dr.GetInt32(dr.GetOrdinal("BookingId"));
            

        }
    }
}
