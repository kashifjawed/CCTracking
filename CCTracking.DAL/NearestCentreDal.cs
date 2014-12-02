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
    public class NearestCentreDal : DBFacade
    {
        private string mapMethod = string.Empty;
        public NearestCentreDal(string mapMethod)
        {
            this.mapMethod = mapMethod;
        }
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            //provide busId
            dictionary.Add("@Id", id);
            return "";
        }

        protected override string GetAllSql()
        {
            return "GetNearestCentreById";
        }

        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            NearestCentre nearestCentre = baseModel as NearestCentre;
            //dictionary.Add("@CentreId", nearestCentre.CentreId);
            dictionary.Add("@Id", nearestCentre.BusId);
            return "GetNearestCentreByCriteria";
        }

        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary) 
        {
            NearestCentre nearestCentre = baseModel as NearestCentre;
            dictionary.Add("@CentreId", nearestCentre.CentreId);
            //dictionary.Add("@NearestCentreId", nearestCentre.NearestCentreId);
            //dictionary.Add("@NearestLevel", nearestCentre.NearestLevel);
            base.ExecuteSql(nearestCentre, dictionary);
            return "dbo.SaveNearestCentre";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            NearestCentreResponse response = new NearestCentreResponse();
            NearestCentre nearestCentre = null;
            if (dr.Read())
            {
                nearestCentre = new NearestCentre();
                MapValues(nearestCentre, dr);
            }
            response.NearestCentreModel = nearestCentre;
            return response;
        }

        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            NearestCentreResponse response = new NearestCentreResponse();
            NearestCentre nearestCentre = null;
            List<NearestCentre> nearestCentres = new List<NearestCentre>();
            while (dr.Read())
            {
                nearestCentre = new NearestCentre();
                MapValues(nearestCentre, dr);
                nearestCentres.Add(nearestCentre);
            }
            response.NearestCentreList = nearestCentres;
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
            if (mapMethod == "GetAll")
                MapValuesGetById(baseModel, dr);
            else if (mapMethod == "GetByCriteria")
                MapValuesGetByCriteria(baseModel, dr);
            
        }

        private void MapValuesGetById(BaseModel baseModel, IDataReader dr)
        {
            NearestCentre nearestCentre = baseModel as NearestCentre;

            if (!dr.IsDBNull(dr.GetOrdinal("CentreId")))
                nearestCentre.CentreId = dr.GetInt32(dr.GetOrdinal("CentreId"));

            if (!dr.IsDBNull(dr.GetOrdinal("CentreName")))
                nearestCentre.CentreName = dr.GetString(dr.GetOrdinal("CentreName"));
            if (!dr.IsDBNull(dr.GetOrdinal("BusList")))
                nearestCentre.BusList = dr.GetString(dr.GetOrdinal("BusList"));
            if (!dr.IsDBNull(dr.GetOrdinal("Address")))
                nearestCentre.Address = dr.GetString(dr.GetOrdinal("Address"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo1")))
                nearestCentre.ContactNo1 = dr.GetString(dr.GetOrdinal("ContactNo1"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo2")))
                nearestCentre.ContactNo2 = dr.GetString(dr.GetOrdinal("ContactNo2"));
        }
        private void MapValuesGetByCriteria(BaseModel baseModel, IDataReader dr)
        {
            NearestCentre nearestCentre = baseModel as NearestCentre;
            if (!dr.IsDBNull(dr.GetOrdinal("BookingId")))
                nearestCentre.BookingId = dr.GetInt32(dr.GetOrdinal("BookingId"));

            if (!dr.IsDBNull(dr.GetOrdinal("PickupDate")))
                nearestCentre.PickupDate = dr.GetDateTime((dr.GetOrdinal("PickupDate")));
            //if (!dr.IsDBNull(dr.GetOrdinal("OutTime")))
            //    nearestCentre.PickupTime = dr.GetString(dr.GetOrdinal("PickupTime"));
            //if (!dr.IsDBNull(dr.GetOrdinal("ReturnTime")))
            //    nearestCentre.ReturnTime = dr.GetString(dr.GetOrdinal("ReturnTime"));
            if (!dr.IsDBNull(dr.GetOrdinal("Address")))
                nearestCentre.Address = dr.GetString(dr.GetOrdinal("Address"));
            if (!dr.IsDBNull(dr.GetOrdinal("BusPoint")))
                nearestCentre.BusPoint = dr.GetString(dr.GetOrdinal("BusPoint"));
            if (!dr.IsDBNull(dr.GetOrdinal("Graveyard")))
                nearestCentre.Graveyard = dr.GetString(dr.GetOrdinal("Graveyard"));
            if (!dr.IsDBNull(dr.GetOrdinal("MasjidName")))
                nearestCentre.MasjidName = dr.GetString(dr.GetOrdinal("MasjidName"));
            if (!dr.IsDBNull(dr.GetOrdinal("NamazEJanazaHeldIn")))
                nearestCentre.NamazEJanazaHeldIn = dr.GetString(dr.GetOrdinal("NamazEJanazaHeldIn"));
            if (!dr.IsDBNull(dr.GetOrdinal("NamazEJanazaLocation")))
                nearestCentre.NamazEJanazaLocation = dr.GetString(dr.GetOrdinal("NamazEJanazaLocation"));
            if (!dr.IsDBNull(dr.GetOrdinal("OtherDetail")))
                nearestCentre.OtherDetail = dr.GetString(dr.GetOrdinal("OtherDetail"));
            if (!dr.IsDBNull(dr.GetOrdinal("VehicleNo")))
                nearestCentre.VehicleNo = dr.GetString(dr.GetOrdinal("VehicleNo"));
            if (!dr.IsDBNull(dr.GetOrdinal("CentreName")))
                nearestCentre.CentreName = dr.GetString(dr.GetOrdinal("CentreName"));
            if (!dr.IsDBNull(dr.GetOrdinal("CenreAddress")))
                nearestCentre.CenreAddress = dr.GetString(dr.GetOrdinal("CenreAddress"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo1")))
                nearestCentre.ContactNo1 = dr.GetString(dr.GetOrdinal("ContactNo1"));
            if (!dr.IsDBNull(dr.GetOrdinal("ContactNo2")))
                nearestCentre.ContactNo2 = dr.GetString(dr.GetOrdinal("ContactNo2"));
            if (!dr.IsDBNull(dr.GetOrdinal("fullName")))
                nearestCentre.FullName= dr.GetString(dr.GetOrdinal("fullName"));
            if (!dr.IsDBNull(dr.GetOrdinal("MobileNo")))
                nearestCentre.MobileNo = dr.GetString(dr.GetOrdinal("MobileNo"));
        }

    }
}
