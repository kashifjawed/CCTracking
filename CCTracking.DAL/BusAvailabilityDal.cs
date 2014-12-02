using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CCTracking.Dto;
using CCTracking.Dto.Response;

namespace CCTracking.DAL
{
    public class BusAvailabilityDal:DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            throw new NotImplementedException();

        }

        protected override string GetAllSql()
        {
            throw new NotImplementedException();

        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            BusAvailability busAvailability = baseModel as BusAvailability;
            dictionary.Add("@BookingId", busAvailability.BookingId);
            return "GetBusAvailabilityByBookingId";
        }

        protected override string GetCountSql()
        {
            throw new NotImplementedException();
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            throw new NotImplementedException();
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            throw new NotImplementedException();

        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            BusAvailabilityResponse response = new BusAvailabilityResponse();
            Bus busAvailability = null;
            if (dr.Read())
            {
                busAvailability = new Bus();
                MapValues(busAvailability, dr);
            }
            response.BusAvailabilityModel= busAvailability;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            BusAvailabilityResponse response = new BusAvailabilityResponse();
            Bus bus = null;
            List<Bus> buses = new List<Bus>();
            while (dr.Read())
            {
                bus = new Bus();
                MapValues(bus, dr);
                buses.Add(bus);
            }
            response.BusAvailabilityList = buses;
            return response;
        }

        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            return null;
        }

        protected override void MapValues(BaseModel baseModel, IDataReader dr)
        {
            base.MapValues(baseModel, dr);
            Bus bus = baseModel as Bus;

            if (!dr.IsDBNull(dr.GetOrdinal("Description")))
                bus.Description = dr.GetString(dr.GetOrdinal("Description"));
            if (!dr.IsDBNull(dr.GetOrdinal("TrackingDeviceId")))
                bus.TrackingDeviceId = dr.GetString(dr.GetOrdinal("TrackingDeviceId"));
        }

    }
}
