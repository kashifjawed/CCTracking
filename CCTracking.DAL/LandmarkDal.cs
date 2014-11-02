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
    public class LandmarkDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetLandmarkById";
        }

        protected override string GetAllSql()
        {
            return "GetAllLandmark";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Landmark landmark = baseModel as Landmark;
            dictionary.Add("@UcId", landmark.UcId);
            dictionary.Add("@Name", landmark.Name);
            return "GetLandmarkByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Landmark landmark = baseModel as Landmark;
            dictionary.Add("@UcId", landmark.UcId);
            dictionary.Add("@Name", landmark.Name);
            base.ExecuteSql(landmark, dictionary);
            return "dbo.SaveLandmark";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            LandmarkResponse response = new LandmarkResponse();
            Landmark landmark = null;
            if (dr.Read())
            {
                landmark = new Landmark();
                MapValues(landmark, dr);
            }
            response.LandmarkModel = landmark;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            LandmarkResponse response = new LandmarkResponse();
            Landmark landmark = null;
            List<Landmark> landmarkes = new List<Landmark>();
            while (dr.Read())
            {
                landmark = new Landmark();
                MapValues(landmark, dr);
                landmarkes.Add(landmark);
            }
            response.LandmarkList = landmarkes;
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
            Landmark landmark = baseModel as Landmark;
            if (!dr.IsDBNull(dr.GetOrdinal("UcId")))
                landmark.UcId = dr.GetInt32(dr.GetOrdinal("UcId"));
            if (!dr.IsDBNull(dr.GetOrdinal("UcDesc")))
                landmark.UcDesc = dr.GetString(dr.GetOrdinal("UcDesc"));
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                landmark.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
