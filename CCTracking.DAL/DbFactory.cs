using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCTracking.DAL
{
    internal class DBFactory
    {
        private static DbProviderFactory objFactory = null;

        public static DbProviderFactory GetProvider(ProviderType provider)
        {
            switch (provider)
            {
                case ProviderType.SqlServer:
                    objFactory = SqlClientFactory.Instance;
                    break;

                //case ProviderType.OleDb:

                //    objFactory = OleDbFactory.Instance;

                //    break;

                //case ProviderType.Oracle:

                //    objFactory = OracleClientFactory.Instance;

                //    break;

                //case ProviderType.ODBC:

                //    objFactory = OdbcFactory.Instance;

                //    break;

            }
            return objFactory;
        }
        public static DbDataAdapter GetDataAdapter(ProviderType providerType)
        {

            switch (providerType)
            {

                case ProviderType.SqlServer:

                    return new SqlDataAdapter();

                //case ProviderType.OleDb:

                //    return new OleDbDataAdapter();

                //case ProviderType.ODBC:

                //    return new OdbcDataAdapter();

                //case ProviderType.Oracle:

                //    return new OracleDataAdapter();

                default:

                    return new SqlDataAdapter();

            }

        }

    }

    internal enum ProviderType
    {
        SqlServer, OleDb, Oracle, ODBC, ConfigDefined
    }
    internal enum DatabaseConnectionState
    {
        KeepOpen, CloseOnExit
    }
    internal enum StoredProcedureParameterDirection
    {
        Input, InputOutput, Output, ReturnValue
    }
}
