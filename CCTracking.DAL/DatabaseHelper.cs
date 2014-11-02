using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.DAL
{
    internal class DatabaseHelper : IDisposable
    {
        private string strConnectionString;
        private DbConnection objConnection;
        private DbCommand objCommand;
        private DbProviderFactory objFactory = null;
        //private ParameterCache parameterCache = ParameterCache.GetParameterCache();
        public DatabaseHelper(string connectionstring, ProviderType provider)
        {

            this.strConnectionString = connectionstring;
            objFactory = DBFactory.GetProvider(provider);
            objConnection = objFactory.CreateConnection();
            objCommand = objFactory.CreateCommand();
            objConnection.ConnectionString = this.strConnectionString;
            objCommand.Connection = objConnection;

        }

        internal int AddParameter(string name, object value)
        {

            DbParameter dbParameter = objFactory.CreateParameter();
            dbParameter.ParameterName = name;
            dbParameter.Value = value;
            return objCommand.Parameters.Add(dbParameter);

        }

        internal int AddParameter(DbParameter parameter)
        {

            return objCommand.Parameters.Add(parameter);

        }

        internal int AddParameter(string name, StoredProcedureParameterDirection parameterDirection)
        {

            DbParameter parameter = objFactory.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = String.Empty;
            parameter.DbType = DbType.String;
            parameter.Size = 50;
            switch (parameterDirection)
            {

                case StoredProcedureParameterDirection.Input:
                    parameter.Direction = System.Data.ParameterDirection.Input;
                    break;
                case StoredProcedureParameterDirection.Output:
                    parameter.Direction = System.Data.ParameterDirection.Output;
                    break;
                case StoredProcedureParameterDirection.InputOutput:
                    parameter.Direction = System.Data.ParameterDirection.InputOutput;
                    break;
                case StoredProcedureParameterDirection.ReturnValue:
                    parameter.Direction = System.Data.ParameterDirection.ReturnValue;
                    break;

            }
            return objCommand.Parameters.Add(parameter);

        }

        internal int AddParameter(string name, object value, StoredProcedureParameterDirection parameterDirection)
        {

            DbParameter parameter = objFactory.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = value;
            parameter.DbType = DbType.String;
            parameter.Size = 50;
            switch (parameterDirection)
            {

                case StoredProcedureParameterDirection.Input:
                    parameter.Direction = System.Data.ParameterDirection.Input;
                    break;
                case StoredProcedureParameterDirection.Output:
                    parameter.Direction = System.Data.ParameterDirection.Output;
                    break;
                case StoredProcedureParameterDirection.InputOutput:
                    parameter.Direction = System.Data.ParameterDirection.InputOutput;
                    break;
                case StoredProcedureParameterDirection.ReturnValue:
                    parameter.Direction = System.Data.ParameterDirection.ReturnValue;
                    break;

            }

            return objCommand.Parameters.Add(parameter);

        }

        internal int AddParameter(string name, StoredProcedureParameterDirection parameterDirection, int size, DbType dbType)
        {

            DbParameter parameter = objFactory.CreateParameter();
            parameter.ParameterName = name;
            parameter.DbType = dbType;
            parameter.Size = size;
            switch (parameterDirection)
            {

                case StoredProcedureParameterDirection.Input:
                    parameter.Direction = System.Data.ParameterDirection.Input;
                    break;
                case StoredProcedureParameterDirection.Output:
                    parameter.Direction = System.Data.ParameterDirection.Output;
                    break;
                case StoredProcedureParameterDirection.InputOutput:
                    parameter.Direction = System.Data.ParameterDirection.InputOutput;
                    break;
                case StoredProcedureParameterDirection.ReturnValue:
                    parameter.Direction = System.Data.ParameterDirection.ReturnValue;
                    break;

            }

            return objCommand.Parameters.Add(parameter);

        }

        internal int AddParameter(string name, object value, StoredProcedureParameterDirection parameterDirection, int size, DbType dbType)
        {

            DbParameter parameter = objFactory.CreateParameter();
            parameter.ParameterName = name;
            parameter.Value = value;
            parameter.DbType = dbType;
            parameter.Size = size;
            switch (parameterDirection)
            {

                case StoredProcedureParameterDirection.Input:
                    parameter.Direction = System.Data.ParameterDirection.Input;
                    break;
                case StoredProcedureParameterDirection.Output:
                    parameter.Direction = System.Data.ParameterDirection.Output;
                    break;
                case StoredProcedureParameterDirection.InputOutput:
                    parameter.Direction = System.Data.ParameterDirection.InputOutput;
                    break;
                case StoredProcedureParameterDirection.ReturnValue:
                    parameter.Direction = System.Data.ParameterDirection.ReturnValue;
                    break;

            }

            return objCommand.Parameters.Add(parameter);

        }

        internal DbCommand Command
        {

            get
            {

                return objCommand;

            }

        }

        internal DbConnection Connection
        {

            get
            {

                return objConnection;

            }

        }

        internal void BeginTransaction()
        {

            if (objConnection.State == System.Data.ConnectionState.Closed)
            {

                objConnection.Open();

            }

            objCommand.Transaction = objConnection.BeginTransaction();

        }

        internal void CommitTransaction()
        {

            objCommand.Transaction.Commit();
            objConnection.Close();

        }

        internal void RollbackTransaction()
        {

            objCommand.Transaction.Rollback();
            objConnection.Close();

        }

        internal int ExecuteNonQuery(string query)
        {

            return ExecuteNonQuery(query, CommandType.Text, DatabaseConnectionState.CloseOnExit);

        }

        internal int ExecuteNonQuery(string query, CommandType commandtype)
        {

            return ExecuteNonQuery(query, commandtype, DatabaseConnectionState.CloseOnExit);

        }

        internal int ExecuteNonQuery(string query, DatabaseConnectionState connectionstate)
        {

            return ExecuteNonQuery(query, CommandType.Text, connectionstate);

        }

        internal int ExecuteNonQuery(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {

            objCommand.CommandText = query;

            objCommand.CommandType = commandtype;

            int i = -1;

            try
            {

                if (objConnection.State == System.Data.ConnectionState.Closed)
                {

                    objConnection.Open();

                }

                i = objCommand.ExecuteNonQuery();

            }

            catch
            {

                throw;

            }

            finally
            {

                if (connectionstate == DatabaseConnectionState.CloseOnExit)
                {

                    objConnection.Close();

                }

            }

            return i;

        }

        internal object ExecuteScalar(string query)
        {

            return ExecuteScalar(query, CommandType.Text, DatabaseConnectionState.CloseOnExit);

        }

        internal object ExecuteScalar(string query, CommandType commandtype)
        {

            return ExecuteScalar(query, commandtype, DatabaseConnectionState.CloseOnExit);

        }

        internal object ExecuteScalar(string query, DatabaseConnectionState connectionstate)
        {

            return ExecuteScalar(query, CommandType.Text, connectionstate);

        }

        internal object ExecuteScalar(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {

            objCommand.CommandText = query;
            objCommand.CommandType = commandtype;
            object o = null;

            try
            {
                if (objConnection.State == System.Data.ConnectionState.Closed)
                {
                    objConnection.Open();
                }
                o = objCommand.ExecuteScalar();
            }
            catch
            {
                throw;
            }
            finally
            {
                objCommand.Parameters.Clear();
                if (connectionstate == DatabaseConnectionState.CloseOnExit)
                {
                    objConnection.Close();
                }

            }

            return o;
        }
        internal DbDataReader ExecuteReader(string query)
        {
            return ExecuteReader(query, CommandType.Text, DatabaseConnectionState.CloseOnExit);
        }

        internal DbDataReader ExecuteReader(string query, CommandType commandtype)
        {
            return ExecuteReader(query, commandtype, DatabaseConnectionState.CloseOnExit);
        }

        internal DbDataReader ExecuteReader(string query, DatabaseConnectionState connectionstate)
        {
            return ExecuteReader(query, CommandType.Text, connectionstate);
        }

        internal DbDataReader ExecuteReader(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {
            objCommand.CommandText = query;
            objCommand.CommandType = commandtype;
            DbDataReader reader = null;

            try
            {
                if (objConnection.State == System.Data.ConnectionState.Closed)
                {
                    objConnection.Open();
                }

                if (connectionstate == DatabaseConnectionState.CloseOnExit)
                {
                    reader = objCommand.ExecuteReader(CommandBehavior.CloseConnection);
                }

                else
                {
                    reader = objCommand.ExecuteReader();
                }

            }

            catch (Exception e)
            {
                throw;
                //string a = e.Message;
            }

            finally
            {
                objCommand.Parameters.Clear();
            }

            return reader;
        }
        internal DataSet ExecuteDataSet(string query)
        {
            return ExecuteDataSet(query, CommandType.Text, DatabaseConnectionState.CloseOnExit);
        }

        internal DataSet ExecuteDataSet(string query, CommandType commandtype)
        {
            return ExecuteDataSet(query, commandtype, DatabaseConnectionState.CloseOnExit);
        }

        internal DataSet ExecuteDataSet(string query, DatabaseConnectionState connectionstate)
        {
            return ExecuteDataSet(query, CommandType.Text, connectionstate);
        }

        internal DataSet ExecuteDataSet(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {
            DbDataAdapter adapter = objFactory.CreateDataAdapter();
            objCommand.CommandText = query;
            objCommand.CommandType = commandtype;
            adapter.SelectCommand = objCommand;
            DataSet ds = new DataSet();

            try
            {
                adapter.Fill(ds);
            }

            catch
            {
                throw;
            }

            finally
            {
                objCommand.Parameters.Clear();
                if (connectionstate == DatabaseConnectionState.CloseOnExit)
                {
                    if (objConnection.State == System.Data.ConnectionState.Open)
                    {

                        objConnection.Close();

                    }

                }

            }

            return ds;
        }
        public void Dispose()
        {
            if (objConnection.State == ConnectionState.Open)
            {

                objConnection.Close();
                objConnection.Dispose();

            }
            objCommand.Dispose();
        }

        internal IDataReader ExecuteReader(string storedProcedureName, params object[] parameters)
        {

            objCommand.CommandText = storedProcedureName;
            objCommand.CommandType = CommandType.StoredProcedure;
            DbDataReader reader = null;

            try
            {

                RetrieveParameters(objCommand);
                SetParameterValues(objCommand, parameters);
                if (objConnection.State == System.Data.ConnectionState.Closed)
                {
                    objConnection.Open();
                }

                reader = objCommand.ExecuteReader();

            }

            catch
            {
                throw;
            }

            finally
            {
                objCommand.Parameters.Clear();
            }

            return reader;

        }
        internal void SetParameterValues(DbCommand objCommand, object[] parameters)
        {
            int index = 0;
            for (int i = 0; i < parameters.Length; i++)
            {

                DbParameter parameter = objCommand.Parameters[i + index];
                SetParameterValue(objCommand, parameter.ParameterName, parameters[i]);

            }

        }

        internal virtual void SetParameterValue(DbCommand dbCommand, string parameterName, object value)
        {

            dbCommand.Parameters[parameterName].Value = (value == null) ? DBNull.Value : value;

        }

        internal void RetrieveParameters(DbCommand dbCommand)
        {

            //if (parameterCache.ContainsParameters(Connection.ConnectionString, dbCommand.CommandText))
            //{
            //    DbParameter[] parameters = parameterCache.GetParameters(Connection.ConnectionString, dbCommand.CommandText);
            //    dbCommand.Parameters.AddRange(parameters);
            //}

            //else
            {
                string connectionString = Connection.ConnectionString;
                dbCommand.Connection = Connection;
                Connection.Open();
                SqlCommandBuilder.DeriveParameters(dbCommand as SqlCommand);
                //parameterCache.AddParameters(connectionString, dbCommand.CommandText, dbCommand.Parameters);

            }

        }

        internal object GetParameter(string name)
        {
            return objCommand.Parameters[name].Value;
        }

    }
}
