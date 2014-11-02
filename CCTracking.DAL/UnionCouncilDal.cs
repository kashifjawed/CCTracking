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
    public class UnionCouncilDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetUnionCouncilById";
        }

        protected override string GetAllSql()
        {
            return "GetAllUnionCouncil";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            UnionCouncil unionCouncil = baseModel as UnionCouncil;
            dictionary.Add("@TownId", unionCouncil.TownId);
            dictionary.Add("@Name", unionCouncil.Name);
            return "GetUnionCouncilByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            UnionCouncil unionCouncil = baseModel as UnionCouncil;
            dictionary.Add("@TownId", unionCouncil.TownId);
            dictionary.Add("@Name", unionCouncil.Name);
            base.ExecuteSql(unionCouncil, dictionary);
            return "dbo.SaveUnionCouncil";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            UnionCouncilResponse response = new UnionCouncilResponse();
            UnionCouncil unionCouncil = null;
            if (dr.Read())
            {
                unionCouncil = new UnionCouncil();
                MapValues(unionCouncil, dr);
            }
            response.UnionCouncilModel = unionCouncil;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            UnionCouncilResponse response = new UnionCouncilResponse();
            UnionCouncil unionCouncil = null;
            List<UnionCouncil> unionCounciles = new List<UnionCouncil>();
            while (dr.Read())
            {
                unionCouncil = new UnionCouncil();
                MapValues(unionCouncil, dr);
                unionCounciles.Add(unionCouncil);
            }
            response.UnionCouncilList = unionCounciles;
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
            UnionCouncil unionCouncil = baseModel as UnionCouncil;
            if (!dr.IsDBNull(dr.GetOrdinal("TownId")))
                unionCouncil.TownId = dr.GetInt32(dr.GetOrdinal("TownId"));
            if (!dr.IsDBNull(dr.GetOrdinal("TownDesc")))
                unionCouncil.TownDesc = dr.GetString(dr.GetOrdinal("TownDesc"));
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                unionCouncil.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
