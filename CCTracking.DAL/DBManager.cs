using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.DAL
{
    internal sealed class DBManager : DBManagerBase
    {
        public void OpenConnection()
        {

            connectionString = ConfigurationSettings.AppSettings["ConnectionString"].ToString();
            base.Open(connectionString);

        }

        public void OpenConnection(String connectionString)
        {
            base.Open(connectionString);
            base.IsOpen = true;

        }

        public void CloseConnection()
        {
            if (base.isOpen)
                base.Close();
            base.IsOpen = false;

        }

        public int AddParameter(string name, object value)
        {
            return databaseHelper.AddParameter(name, value);
        }

        public int AddParameter(string name, StoredProcedureParameterDirection parameterDirection)
        {
            return databaseHelper.AddParameter(name, parameterDirection);

        }

        public int AddParameter(string name, object value, StoredProcedureParameterDirection parameterDirection)
        {
            return databaseHelper.AddParameter(name, value, parameterDirection);
        }

        public int AddParameter(string name, StoredProcedureParameterDirection parameterDirection, int size, DbType dbType)
        {
            return databaseHelper.AddParameter(name, parameterDirection, size, dbType);
        }

        public int AddParameter(string name, object value, StoredProcedureParameterDirection parameterDirection, int size, DbType dbType)
        {
            return databaseHelper.AddParameter(name, value, parameterDirection, size, dbType);
        }

        public object GetParameter(string name)
        {
            return databaseHelper.GetParameter(name);
        }

        public DbDataReader ExecuteReader(string query)
        {
            this.dbDataReader = databaseHelper.ExecuteReader(query);
            return this.dbDataReader;
        }

        public DbDataReader ExecuteReader(string query, CommandType commandtype)
        {
            this.dbDataReader = databaseHelper.ExecuteReader(query, commandtype, DatabaseConnectionState.CloseOnExit);
            return this.dbDataReader;
        }

        public IDataReader ExecuteReader(string storedProcedureName, params object[] parameters)
        {
            this.dbDataReader = (DbDataReader)databaseHelper.ExecuteReader(storedProcedureName, parameters);
            return this.dbDataReader;
        }

        public DbDataReader ExecuteReader(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {
            this.dbDataReader = databaseHelper.ExecuteReader(query, commandtype, connectionstate);
            return this.dbDataReader;
        }

        public DbDataReader ExecuteReader(string query, DatabaseConnectionState connectionstate)
        {
            this.dbDataReader = databaseHelper.ExecuteReader(query, connectionstate);
            return this.dbDataReader;
        }

        public object ExecuteScalar(string query)
        {
            return databaseHelper.ExecuteScalar(query);
        }

        public object ExecuteScalar(string query, CommandType commandtype)
        {
            return databaseHelper.ExecuteScalar(query, commandtype);
        }

        public object ExecuteScalar(string query, DatabaseConnectionState connectionstate)
        {
            return databaseHelper.ExecuteScalar(query, connectionstate);
        }

        public object ExecuteScalar(string query, CommandType commandtype, DatabaseConnectionState connectionstate)
        {
            return databaseHelper.ExecuteScalar(query, commandtype, connectionstate);
        }

        public DataSet ExecuteDataSet(string query)
        {
            this.dataSet = databaseHelper.ExecuteDataSet(query);
            return this.dataSet;
        }

        public DataSet ExecuteDataSet(string query, CommandType commandtype)
        {
            this.dataSet = databaseHelper.ExecuteDataSet(query, commandtype);
            return this.dataSet;
        }

        public int ExecuteNonQuery(string query, CommandType commandtype)
        {
            return databaseHelper.ExecuteNonQuery(query, commandtype);
        }

        public int ExecuteNonQuery(string query, CommandType commandtype, DatabaseConnectionState databaseConnectionState)
        {
            return databaseHelper.ExecuteNonQuery(query, commandtype, databaseConnectionState);
        }
    }
}
