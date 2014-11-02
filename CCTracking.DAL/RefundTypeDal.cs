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
    public class RefundTypeDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetRefundTypeById";
        }

        protected override string GetAllSql()
        {
            return "GetAllRefundType";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            RefundType refundType = baseModel as RefundType;
            dictionary.Add("@Name", refundType.Name);
            return "GetRefundTypeByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            RefundType refundType = baseModel as RefundType;
            dictionary.Add("@Name", refundType.Name);            
            base.ExecuteSql(refundType, dictionary);
            return "dbo.SaveRefundType";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            RefundTypeResponse response = new RefundTypeResponse();
            RefundType refundType = null;
            if (dr.Read())
            {
                refundType = new RefundType();
                MapValues(refundType, dr);
            }
            response.RefundTypeModel = refundType;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            RefundTypeResponse response = new RefundTypeResponse();
            RefundType refundType = null;
            List<RefundType> refundTypees = new List<RefundType>();
            while (dr.Read())
            {
                refundType = new RefundType();
                MapValues(refundType, dr);
                refundTypees.Add(refundType);
            }
            response.RefundTypeList = refundTypees;
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
            RefundType refundType = baseModel as RefundType;
            if (!dr.IsDBNull(dr.GetOrdinal("Name")))
                refundType.Name = dr.GetString(dr.GetOrdinal("Name"));
        }
    }
}
