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
    public class TownDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetTownById";
        }

        protected override string GetAllSql()
        {
            return "GetAllTown";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Town town = baseModel as Town;
            dictionary.Add("@Name", town.Name);
            return "GetTownByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            Town town = baseModel as Town;
            dictionary.Add("@Name", town.Name);            
            base.ExecuteSql(town, dictionary);
            return "dbo.SaveTown";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            TownResponse response = new TownResponse();
            Town town = null;
            if (dr.Read())
            {
                town = new Town();
                MapValues(town, dr);
            }
            response.TownModel = town;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            TownResponse response = new TownResponse();
            Town town = null;
            List<Town> townes = new List<Town>();
            while (dr.Read())
            {
                town = new Town();
                MapValues(town, dr);
                townes.Add(town);
            }
            response.TownList = townes;
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
            Town town = baseModel as Town;
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                town.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
