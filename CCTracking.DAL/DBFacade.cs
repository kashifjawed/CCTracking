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
    public abstract class DBFacade
    {
        string ConnectionString { get; set; }
        protected abstract BaseModelResponse ConvertToModel(IDataReader dr);
        protected abstract BaseModelResponse ConvertToList(IDataReader dr);
        protected abstract BaseModelResponse ConvertToList(DataSet ds);
        protected abstract string GetByIdSql(int id, Dictionary<string, object> dictionary);
        protected abstract string DelByIdSql(int id, Dictionary<string, object> dictionary);
        protected abstract string GetCountSql();
        protected abstract string GetAllSql();
        protected abstract string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary);
        protected virtual string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", baseModel.Id);
            dictionary.Add("@IsActive", baseModel.IsActive);
            dictionary.Add("@CreatedBy", baseModel.CreatedBy);
            dictionary.Add("@ModifiedBy", baseModel.ModifiedBy);
            dictionary.Add("@ModifiedDate", baseModel.ModifiedDate);
            return string.Empty;
        }

        /// <summary>
        /// 
        /// </summary>
        public DBFacade()
        {
            this.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings["CCTConnectionString"].ConnectionString;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseModelResponse GetById(int id)
        {
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = GetByIdSql(id, arrParam);
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            IDataReader dr = null;
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }

                dr = dbManager.ExecuteReader(sql, CommandType.StoredProcedure);
                baseModelResponse = ConvertToModel(dr);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                if (dr != null && !dr.IsClosed)
                    dr.Close();
                dbManager.CloseConnection();
            }
            return baseModelResponse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public BaseModelResponse GetAll(int id = 0)
        {
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = GetAllSql();
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            IDataReader dr = null;
            try
            {
                if (id != 0)
                {
                    arrParam.Add("@Id", id);
                }
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }
                dr = dbManager.ExecuteReader(sql, CommandType.StoredProcedure);
                baseModelResponse = ConvertToList(dr);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                dr.Close();
                dbManager.CloseConnection();
            }
            return baseModelResponse;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="baseModel"></param>
        /// <returns></returns>
        public BaseModelResponse GetByCriteria(BaseModel baseModel)
        {
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = GetByCriteriaSql(baseModel, arrParam);
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            IDataReader dr = null;
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }
                dr = dbManager.ExecuteReader(sql, CommandType.StoredProcedure);
                baseModelResponse = ConvertToList(dr);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                dr.Close();
                dbManager.CloseConnection();
            }
            return baseModelResponse;
        }

        /// <summary>
        /// Insert/Update - return newly created/updated object
        /// </summary>
        /// <param name="arrParam"></param>
        /// <returns></returns>
        public BaseModelResponse Execute(BaseModel baseModel)
        {
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = ExecuteSql(baseModel, arrParam);
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            IDataReader dr = null;
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }

                dr = dbManager.ExecuteReader(sql, CommandType.StoredProcedure);
                baseModelResponse = ConvertToModel(dr);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                if (dr != null && !dr.IsClosed)
                    dr.Close();
                dbManager.CloseConnection();
            }
            return baseModelResponse;
        }

        /// <summary>
        /// Insert/Update - return newly created/updated object
        /// </summary>
        /// <param name="arrParam"></param>
        /// <returns></returns>
        public BaseModelResponse ExecuteDs(BaseModel baseModel)
        {
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = ExecuteSql(baseModel, arrParam);
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            DataSet ds = new DataSet();
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }

                ds = dbManager.ExecuteDataSet(sql, CommandType.StoredProcedure);
                baseModelResponse = ConvertToList(ds);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                ds = null;
                dbManager.CloseConnection();
            }
            return baseModelResponse;
        }

        public bool DeleteById(int id)
        {
            bool deleteFlag = false;
            Dictionary<string, object> arrParam = new Dictionary<string, object>();
            String sql = DelByIdSql(id, arrParam);
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            IDataReader dr = null;
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                {
                    dbManager.AddParameter(item.Key, item.Value);
                }
                dr = dbManager.ExecuteReader(sql, CommandType.StoredProcedure);
                //baseModelResponse = ConvertToModel(dr);
                deleteFlag = true;
            }
            catch (Exception e)
            {
                deleteFlag = false;
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                if (dr != null && !dr.IsClosed)
                    dr.Close();
                dbManager.CloseConnection();
            }
            return deleteFlag;
        }

        public int GetCount()
        {
            Object resultCount = 0;
            String sql = GetCountSql();
            BaseModelResponse baseModelResponse = new BaseModelResponse();
            DBManager dbManager = new DBManager();
            dbManager.ConnectionString = this.ConnectionString;
            //IDataReader dr = null;
            try
            {
                dbManager.OpenConnection(dbManager.ConnectionString);
                //foreach (System.Collections.Generic.KeyValuePair<string, object> item in arrParam)
                //{
                //    dbManager.AddParameter(item.Key, item.Value);
                //}
                resultCount = dbManager.ExecuteScalar(sql, CommandType.StoredProcedure);

            }
            catch (Exception e)
            {
                baseModelResponse.ErrorMessage = e.Message;
            }
            finally
            {
                dbManager.CloseConnection();
            }
            return (int)resultCount;
        }

        protected virtual void MapValues(BaseModel basemodel, IDataReader dr)
        {
            basemodel.Id = dr.GetInt32(dr.GetOrdinal("Id"));
            basemodel.IsActive = dr.GetBoolean(dr.GetOrdinal("IsActive"));
            basemodel.CreatedBy = dr.GetInt32(dr.GetOrdinal("CreatedBy"));
            basemodel.CreatedDate = dr.GetDateTime(dr.GetOrdinal("CreatedDate"));
            basemodel.ModifiedBy = dr.GetInt32(dr.GetOrdinal("ModifiedBy"));
            basemodel.ModifiedDate = dr.GetDateTime(dr.GetOrdinal("ModifiedDate"));
        }
    }
}
