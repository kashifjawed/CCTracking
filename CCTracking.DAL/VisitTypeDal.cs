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
    public class VisitTypeDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetVisitTypeById";
        }

        protected override string GetAllSql()
        {
            return "GetAllVisitType";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            VisitType visitType = baseModel as VisitType;
            dictionary.Add("@Name", visitType.Name);
            return "GetVisitTypeByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            VisitType visitType = baseModel as VisitType;
            dictionary.Add("@Name", visitType.Name);            
            base.ExecuteSql(visitType, dictionary);
            return "dbo.SaveVisitType";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            VisitTypeResponse response = new VisitTypeResponse();
            VisitType visitType = null;
            if (dr.Read())
            {
                visitType = new VisitType();
                MapValues(visitType, dr);
            }
            response.VisitTypeModel = visitType;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            VisitTypeResponse response = new VisitTypeResponse();
            VisitType visitType = null;
            List<VisitType> visitTypees = new List<VisitType>();
            while (dr.Read())
            {
                visitType = new VisitType();
                MapValues(visitType, dr);
                visitTypees.Add(visitType);
            }
            response.VisitTypeList = visitTypees;
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
            VisitType visitType = baseModel as VisitType;
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                visitType.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
