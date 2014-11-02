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
    public class GraveyardDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetGraveyardById";
        }

        protected override string GetAllSql()
        {
            return "GetAllGraveyard";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Graveyard graveyard = baseModel as Graveyard;
            dictionary.Add("@LandmarkId", graveyard.LandmarkId);
            dictionary.Add("@Name", graveyard.Name);
            return "GetGraveyardByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Graveyard graveyard = baseModel as Graveyard;
            dictionary.Add("@LandmarkId", graveyard.LandmarkId);
            dictionary.Add("@Name", graveyard.Name);
            base.ExecuteSql(graveyard, dictionary);
            return "dbo.SaveGraveyard";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            GraveyardResponse response = new GraveyardResponse();
            Graveyard graveyard = null;
            if (dr.Read())
            {
                graveyard = new Graveyard();
                MapValues(graveyard, dr);
            }
            response.GraveyardModel = graveyard;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            GraveyardResponse response = new GraveyardResponse();
            Graveyard graveyard = null;
            List<Graveyard> graveyardes = new List<Graveyard>();
            while (dr.Read())
            {
                graveyard = new Graveyard();
                MapValues(graveyard, dr);
                graveyardes.Add(graveyard);
            }
            response.GraveyardList = graveyardes;
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
            Graveyard graveyard = baseModel as Graveyard;
            if (!dr.IsDBNull(dr.GetOrdinal("LandmarkId")))
                graveyard.LandmarkId = dr.GetInt32(dr.GetOrdinal("LandmarkId"));
            if (!dr.IsDBNull(dr.GetOrdinal("LandmarkDesc")))
                graveyard.LandmarkDesc = dr.GetString(dr.GetOrdinal("LandmarkDesc"));
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                graveyard.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
