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
    public class LookupDal : DBFacade
    {
        protected override string GetByIdSql(int id, Dictionary<string, object> dictionary)
        {
            return "";
        }
        protected override string GetAllSql()
        {
            return "select * from Booking";
        }
        protected override string GetByCriteriaSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            return "";
        }
        protected override string ExecuteSql(BaseModel baseModel, Dictionary<string, object> dictionary)
        {
            return "dbo.Lookup";
        }

        protected override BaseModelResponse ConvertToModel(IDataReader dr)
        {
            return null;
        }
        protected override BaseModelResponse ConvertToList(IDataReader dr)
        {
            return null;
        }
        protected override BaseModelResponse ConvertToList(DataSet ds)
        {
            LookupResponse lookupResponse = new LookupResponse();
            List<Lookup> causeOfDeath = new List<Lookup>();
            List<Lookup> town = new List<Lookup>();
            List<Lookup> unionCouncil = new List<Lookup>();
            List<Lookup> landmark = new List<Lookup>();
            List<Lookup> graveyard = new List<Lookup>();
            List<Lookup> bus = new List<Lookup>();
            List<Lookup> alkhidmatCentre = new List<Lookup>();
            List<Lookup> driver = new List<Lookup>();
            List<Lookup> cashier = new List<Lookup>();
            List<Lookup> paymentType = new List<Lookup>();
            List<Lookup> visitType = new List<Lookup>();
            List<Lookup> role = new List<Lookup>();
            List<Lookup> refundType = new List<Lookup>();


            Lookup lookup = null;
            if (ds != null && ds.Tables.Count > 0)
            {
                foreach (DataRow item in ds.Tables[0].Rows)
                {
                    causeOfDeath.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[1].Rows)
                {
                    town.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[2].Rows)
                {
                    unionCouncil.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[3].Rows)
                {
                    landmark.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[4].Rows)
                {
                    graveyard.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[5].Rows)
                {
                    bus.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[6].Rows)
                {
                    driver.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[7].Rows)
                {
                    alkhidmatCentre.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[8].Rows)
                {
                    cashier.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[9].Rows)
                {
                    paymentType.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[10].Rows)
                {
                    visitType.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[11].Rows)
                {
                    role.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                foreach (DataRow item in ds.Tables[12].Rows)
                {
                    refundType.Add(new Lookup { Id = Convert.ToInt32(item["id"]), Description = item["description"].ToString() });
                }
                lookupResponse.CauseOfDeath = causeOfDeath;
                lookupResponse.Town = town;
                lookupResponse.UnionCouncil = unionCouncil;
                lookupResponse.Landmark = landmark;
                lookupResponse.Graveyard = graveyard;
                lookupResponse.Bus = bus;
                lookupResponse.Driver = driver;
                lookupResponse.AlkhidmatCentre = alkhidmatCentre;
                lookupResponse.Cashier = cashier;
                lookupResponse.PaymentType = paymentType;
                lookupResponse.Prayers = GetPrayers();
                lookupResponse.BusStatus = GetBusStatus();
                lookupResponse.TimeSlot = GetTimeSlots();
                lookupResponse.VisitType = visitType;
                lookupResponse.BusModel = GetBusModel();
                lookupResponse.Role = role;
                lookupResponse.RefundType = refundType;

            }
            return lookupResponse;
        }

        protected override string DelByIdSql(int id, Dictionary<string, object> dictionary)
        {
            return string.Empty;
        }

        protected override string GetCountSql()
        {
            return string.Empty;
        }

        private List<Lookup> GetPrayers()
        {
            List<Lookup> prayers = new List<Lookup>();
            prayers.Add(new Lookup { Id = 1, Description = "Fajr" });
            prayers.Add(new Lookup { Id = 2, Description = "Before Dhuhr" });
            prayers.Add(new Lookup { Id = 3, Description = "Dhuhr/Juma'ah" });
            prayers.Add(new Lookup { Id = 4, Description = "Asr" });
            prayers.Add(new Lookup { Id = 5, Description = "Maghrib" });
            prayers.Add(new Lookup { Id = 6, Description = "Isha'a" });
            prayers.Add(new Lookup { Id = 7, Description = "After Isha'a" });
            return prayers;
        }
        private List<Lookup> GetBusStatus()
        {
            List<Lookup> busStatus = new List<Lookup>();
            busStatus.Add(new Lookup { Id = 1, Description = "Available" });
            busStatus.Add(new Lookup { Id = 2, Description = "Booked - Unpaid" });
            busStatus.Add(new Lookup { Id = 3, Description = "Booked - Paid" });
            busStatus.Add(new Lookup { Id = 4, Description = "Available Soon" });
            busStatus.Add(new Lookup { Id = 5, Description = "Maintenance" });
            busStatus.Add(new Lookup { Id = 6, Description = "Puncher" });
            busStatus.Add(new Lookup { Id = 7, Description = "Unavailable" });
            
            return busStatus;
        }

        private List<Lookup> GetTimeSlots()
        {
            List<Lookup> timeSlot = new List<Lookup>();
            timeSlot.Add(new Lookup { Id = 1, Description = "12:00 am" });
            timeSlot.Add(new Lookup { Id = 2, Description = "12:15 am" });
            timeSlot.Add(new Lookup { Id = 3, Description = "12:30 am" });
            timeSlot.Add(new Lookup { Id = 4, Description = "12:45 am" });
            timeSlot.Add(new Lookup { Id = 5, Description = "01:00 am" });
            timeSlot.Add(new Lookup { Id = 6, Description = "01:15 am" });
            timeSlot.Add(new Lookup { Id = 7, Description = "01:30 am" });
            timeSlot.Add(new Lookup { Id = 8, Description = "01:45 am" });
            timeSlot.Add(new Lookup { Id = 9, Description = "02:00 am" });
            timeSlot.Add(new Lookup { Id = 10, Description = "02:15 am" });
            timeSlot.Add(new Lookup { Id = 11, Description = "02:30 am" });
            timeSlot.Add(new Lookup { Id = 12, Description = "02:45 am" });
            timeSlot.Add(new Lookup { Id = 13, Description = "03:00 am" });
            timeSlot.Add(new Lookup { Id = 14, Description = "03:15 am" });
            timeSlot.Add(new Lookup { Id = 15, Description = "03:30 am" });
            timeSlot.Add(new Lookup { Id = 16, Description = "03:45 am" });
            timeSlot.Add(new Lookup { Id = 17, Description = "04:00 am" });
            timeSlot.Add(new Lookup { Id = 18, Description = "04:15 am" });
            timeSlot.Add(new Lookup { Id = 19, Description = "04:30 am" });
            timeSlot.Add(new Lookup { Id = 20, Description = "04:45 am" });
            timeSlot.Add(new Lookup { Id = 21, Description = "05:00 am" });
            timeSlot.Add(new Lookup { Id = 22, Description = "05:15 am" });
            timeSlot.Add(new Lookup { Id = 23, Description = "05:30 am" });
            timeSlot.Add(new Lookup { Id = 24, Description = "05:45 am" });
            timeSlot.Add(new Lookup { Id = 25, Description = "06:00 am" });
            timeSlot.Add(new Lookup { Id = 26, Description = "06:15 am" });
            timeSlot.Add(new Lookup { Id = 27, Description = "06:30 am" });
            timeSlot.Add(new Lookup { Id = 28, Description = "06:45 am" });
            timeSlot.Add(new Lookup { Id = 29, Description = "07:00 am" });
            timeSlot.Add(new Lookup { Id = 30, Description = "07:15 am" });
            timeSlot.Add(new Lookup { Id = 31, Description = "07:30 am" });
            timeSlot.Add(new Lookup { Id = 32, Description = "07:45 am" });
            timeSlot.Add(new Lookup { Id = 33, Description = "08:00 am" });
            timeSlot.Add(new Lookup { Id = 34, Description = "08:15 am" });
            timeSlot.Add(new Lookup { Id = 35, Description = "08:30 am" });
            timeSlot.Add(new Lookup { Id = 36, Description = "08:45 am" });
            timeSlot.Add(new Lookup { Id = 37, Description = "09:00 am" });
            timeSlot.Add(new Lookup { Id = 38, Description = "09:15 am" });
            timeSlot.Add(new Lookup { Id = 39, Description = "09:30 am" });
            timeSlot.Add(new Lookup { Id = 40, Description = "09:45 am" });
            timeSlot.Add(new Lookup { Id = 41, Description = "10:00 am" });
            timeSlot.Add(new Lookup { Id = 42, Description = "10:15 am" });
            timeSlot.Add(new Lookup { Id = 43, Description = "10:30 am" });
            timeSlot.Add(new Lookup { Id = 44, Description = "10:45 am" });
            timeSlot.Add(new Lookup { Id = 45, Description = "11:00 am" });
            timeSlot.Add(new Lookup { Id = 46, Description = "11:15 am" });
            timeSlot.Add(new Lookup { Id = 47, Description = "11:30 am" });
            timeSlot.Add(new Lookup { Id = 48, Description = "11:45 am" });
            timeSlot.Add(new Lookup { Id = 49, Description = "12:00 pm" });
            timeSlot.Add(new Lookup { Id = 50, Description = "12:15 pm" });
            timeSlot.Add(new Lookup { Id = 51, Description = "12:30 pm" });
            timeSlot.Add(new Lookup { Id = 52, Description = "12:45 pm" });
            timeSlot.Add(new Lookup { Id = 53, Description = "01:00 pm" });
            timeSlot.Add(new Lookup { Id = 54, Description = "01:15 pm" });
            timeSlot.Add(new Lookup { Id = 55, Description = "01:30 pm" });
            timeSlot.Add(new Lookup { Id = 56, Description = "01:45 pm" });
            timeSlot.Add(new Lookup { Id = 57, Description = "02:00 pm" });
            timeSlot.Add(new Lookup { Id = 58, Description = "02:15 pm" });
            timeSlot.Add(new Lookup { Id = 59, Description = "02:30 pm" });
            timeSlot.Add(new Lookup { Id = 60, Description = "02:45 pm" });
            timeSlot.Add(new Lookup { Id = 61, Description = "03:00 pm" });
            timeSlot.Add(new Lookup { Id = 62, Description = "03:15 pm" });
            timeSlot.Add(new Lookup { Id = 63, Description = "03:30 pm" });
            timeSlot.Add(new Lookup { Id = 64, Description = "03:45 pm" });
            timeSlot.Add(new Lookup { Id = 65, Description = "04:00 pm" });
            timeSlot.Add(new Lookup { Id = 66, Description = "04:15 pm" });
            timeSlot.Add(new Lookup { Id = 67, Description = "04:30 pm" });
            timeSlot.Add(new Lookup { Id = 68, Description = "04:45 pm" });
            timeSlot.Add(new Lookup { Id = 69, Description = "05:00 pm" });
            timeSlot.Add(new Lookup { Id = 70, Description = "05:15 pm" });
            timeSlot.Add(new Lookup { Id = 71, Description = "05:30 pm" });
            timeSlot.Add(new Lookup { Id = 72, Description = "05:45 pm" });
            timeSlot.Add(new Lookup { Id = 73, Description = "06:00 pm" });
            timeSlot.Add(new Lookup { Id = 74, Description = "06:15 pm" });
            timeSlot.Add(new Lookup { Id = 75, Description = "06:30 pm" });
            timeSlot.Add(new Lookup { Id = 76, Description = "06:45 pm" });
            timeSlot.Add(new Lookup { Id = 77, Description = "07:00 pm" });
            timeSlot.Add(new Lookup { Id = 78, Description = "07:15 pm" });
            timeSlot.Add(new Lookup { Id = 79, Description = "07:30 pm" });
            timeSlot.Add(new Lookup { Id = 80, Description = "07:45 pm" });
            timeSlot.Add(new Lookup { Id = 81, Description = "08:00 pm" });
            timeSlot.Add(new Lookup { Id = 82, Description = "08:15 pm" });
            timeSlot.Add(new Lookup { Id = 83, Description = "08:30 pm" });
            timeSlot.Add(new Lookup { Id = 84, Description = "08:45 pm" });
            timeSlot.Add(new Lookup { Id = 85, Description = "09:00 pm" });
            timeSlot.Add(new Lookup { Id = 86, Description = "09:15 pm" });
            timeSlot.Add(new Lookup { Id = 87, Description = "09:30 pm" });
            timeSlot.Add(new Lookup { Id = 88, Description = "09:45 pm" });
            timeSlot.Add(new Lookup { Id = 89, Description = "09:45 pm" });
            timeSlot.Add(new Lookup { Id = 90, Description = "10:00 pm" });
            timeSlot.Add(new Lookup { Id = 91, Description = "10:15 pm" });
            timeSlot.Add(new Lookup { Id = 92, Description = "10:30 pm" });
            timeSlot.Add(new Lookup { Id = 93, Description = "10:45 pm" });
            timeSlot.Add(new Lookup { Id = 94, Description = "11:00 pm" });
            timeSlot.Add(new Lookup { Id = 95, Description = "11:15 pm" });
            timeSlot.Add(new Lookup { Id = 96, Description = "11:30 pm" });
            timeSlot.Add(new Lookup { Id = 97, Description = "11:45 pm" });
            return timeSlot;
        }

        private List<Lookup> GetBusModel()
        {
            List<Lookup> busSlot = new List<Lookup>();

            for (int year = DateTime.Now.Year; year > 1985; year--)
            {
                busSlot.Add(new Lookup { Id = year, Description = year.ToString() });
            }

            return busSlot;
        }
    }
}
