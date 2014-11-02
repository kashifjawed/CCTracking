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
    public class TrackingDeviceDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            dictionary.Add("@Id", id);
            return "GetTrackingDeviceById";
        }

        protected override string GetAllSql()
        {
            return "GetAllTrackingDevice";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            TrackingDevice trackingDevice = baseModel as TrackingDevice;
            dictionary.Add("@TrackingNo", trackingDevice.TrackingNo);
            return "GetTrackingDeviceByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            TrackingDevice trackingDevice = baseModel as TrackingDevice;
            dictionary.Add("@TrackingNo", trackingDevice.TrackingNo);            
            base.ExecuteSql(trackingDevice, dictionary);
            return "dbo.SaveTrackingDevice";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            TrackingDeviceResponse response = new TrackingDeviceResponse();
            TrackingDevice trackingDevice = null;
            if (dr.Read())
            {
                trackingDevice = new TrackingDevice();
                MapValues(trackingDevice, dr);
            }
            response.TrackingDeviceModel = trackingDevice;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            TrackingDeviceResponse response = new TrackingDeviceResponse();
            TrackingDevice trackingDevice = null;
            List<TrackingDevice> trackingDevicees = new List<TrackingDevice>();
            while (dr.Read())
            {
                trackingDevice = new TrackingDevice();
                MapValues(trackingDevice, dr);
                trackingDevicees.Add(trackingDevice);
            }
            response.TrackingDeviceList = trackingDevicees;
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
            TrackingDevice trackingDevice = baseModel as TrackingDevice;
            if (!dr.IsDBNull(dr.GetOrdinal("TrackingNo")))
                trackingDevice.TrackingNo = dr.GetString(dr.GetOrdinal("TrackingNo"));
        }
    }
}
