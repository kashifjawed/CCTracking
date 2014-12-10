using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class BusVisitMilageSummaryDal:DBFacade
    {

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            throw new NotImplementedException();
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
            return "dbo.RptBusMilageSummary";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            BusVisit busVisit = (BusVisit)baseModel;
            dictionary.Add("@busId", busVisit.BusId);
            return "dbo.RptBusMilageDetail";
        }
        protected virtual void MapValues(BaseModel baseModel, IDataReader dr)
        {
            BusVisit busVisit = baseModel as BusVisit;
            if (dr.IsColumnExists("BusId"))
                busVisit.BusId = dr.GetInt32(dr.GetOrdinal("BusId"));

            if (dr.IsColumnExists("Driver"))
                busVisit.DriverDesc = dr.GetString(dr.GetOrdinal("Driver"));
            if (dr.IsColumnExists("Centre"))
                busVisit.CentreDesc = dr.GetString(dr.GetOrdinal("Centre"));

            if (dr.IsColumnExists("VehicleNo"))
                busVisit.VehicleNo = dr.GetString(dr.GetOrdinal("VehicleNo"));

            if (dr.IsColumnExists("VisitCount"))
                busVisit.VisitCount = dr.GetInt32(dr.GetOrdinal("VisitCount"));

            if (dr.IsColumnExists("visitDate") && dr["visitDate"] != DBNull.Value)
                busVisit.VisitDate = dr.GetDateTime(dr.GetOrdinal("visitDate"));

            if (dr.IsColumnExists("visitInterval") && dr["visitInterval"]!=DBNull.Value)
                busVisit.VisitInterval = dr.GetString(dr.GetOrdinal("visitInterval"));

            if (dr.IsColumnExists("BookingId"))
                busVisit.BookingId = dr.GetInt32(dr.GetOrdinal("BookingId"));

            if (dr.IsColumnExists("OutTime"))
                busVisit.OutTimeDesc = dr.GetString(dr.GetOrdinal("OutTime"));
            if (dr.IsColumnExists("ReturnTime"))
                busVisit.ReturnTimeDesc = dr.GetString(dr.GetOrdinal("ReturnTime"));

            if (dr.IsColumnExists("Milage"))
                busVisit.Milage = dr["Milage"].ToString();


        }
    }
}
