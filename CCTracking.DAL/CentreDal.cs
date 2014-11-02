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
    public class CentreDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetCentreById";
        }

        protected override string GetAllSql()
        {
            return "GetAllCentre";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            AlkhidmatCentre centre = baseModel as AlkhidmatCentre;
            dictionary.Add("@Name", centre.Name);
            return "GetCentreByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary) 
        {
            AlkhidmatCentre centre = baseModel as AlkhidmatCentre;
            //dictionary.Add("@Id", centre.Id);
            dictionary.Add("@Name", centre.Name);
            dictionary.Add("@Address", centre.Address);
            dictionary.Add("@ContactNo1", centre.ContactNo1);
            dictionary.Add("@ContactNo2", centre.ContactNo2);
            dictionary.Add("@LandmarkId", centre.LandmarkId);
            dictionary.Add("@IsCoPartner", centre.IsCoPartner);
            base.ExecuteSql(centre, dictionary);
            return "dbo.SaveCentre";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            CentreResponse response = new CentreResponse();
            AlkhidmatCentre centre = null;
            if (dr.Read())
            {
                centre = new AlkhidmatCentre();
                MapValues(centre, dr);
            }
            response.CentreModel = centre;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            CentreResponse response = new CentreResponse();
            AlkhidmatCentre centre = null;
            List<AlkhidmatCentre> centres = new List<AlkhidmatCentre>();
            while (dr.Read())
            {
                centre = new AlkhidmatCentre();
                MapValues(centre, dr);
                centres.Add(centre);
            }
            response.CentreList = centres;
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
            AlkhidmatCentre centre = baseModel as AlkhidmatCentre;

            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                centre.Name = dr.GetString(dr.GetOrdinal("Name"));
            if (!dr.IsDBNull(dr.GetOrdinal("LandmarkId")))
                centre.LandmarkId = dr.GetInt32(dr.GetOrdinal("LandmarkId"));
            if (!dr.IsDBNull(dr.GetOrdinal("Address")))
                centre.Address = dr.GetString(dr.GetOrdinal("Address"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo1")))
                centre.ContactNo1 = dr.GetString(dr.GetOrdinal("ContactNo1"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo2")))
                centre.ContactNo2 = dr.GetString(dr.GetOrdinal("ContactNo2"));
            if (!dr.IsDBNull(dr.GetOrdinal("IsCoPartner")))
                centre.IsCoPartner = dr.GetBoolean(dr.GetOrdinal("IsCoPartner"));
        }
    }
}
