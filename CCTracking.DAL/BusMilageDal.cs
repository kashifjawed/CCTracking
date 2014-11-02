using CCTracking.Dto;
using CCTracking.Dto.Response;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;


namespace CCTracking.DAL
{
    public class BusMilageDal : DBFacade
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
            SearchCriteria searchCriteria = (SearchCriteria)baseModel;

            dictionary.Add("@FromVisitDate", searchCriteria.FromVisitDate);
            dictionary.Add("@ToVisitDate", searchCriteria.ToVisitDate);
            return "GetAdminBusMilageReport";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
           return "";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            BusMilageResponse busMilageResponse = new BusMilageResponse();
            BusMilage busMilage = null;
            while (dr.Read())
            {
                busMilage = new BusMilage();
                MapValues(busMilage, dr);
                busMilageResponse.BusMilageModel = busMilage;
            }
            return busMilageResponse;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BusMilageResponse busMilageResponse = new BusMilageResponse();
            List<BusMilage> busMilages = new List<BusMilage>();
            BusMilage busMilage = null;
            while (dr.Read())
            {
                busMilage = new BusMilage();
                MapValues(busMilage, dr);
                busMilages.Add(busMilage);
            }
            busMilageResponse.BusMilageList = busMilages;
            return busMilageResponse;
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

        private void MapValues(BusMilage busMilage, IDataReader dr)
        {
            busMilage.BusId = Convert.ToInt32(dr["BusId"]);
            busMilage.CentreDesc = dr["CentreDesc"].ToString();
            busMilage.VehicleNo = dr["VehicleNo"].ToString();
            busMilage.TotalMilage = Convert.ToInt32(dr["TotalMilage"]);
            busMilage.TotalVisits = Convert.ToInt32(dr["TotalVisits"]);
        }
    }
}
