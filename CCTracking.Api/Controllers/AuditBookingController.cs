using System.Collections.Generic;
using System.Web.Http;
using CCTracking.DAL;
using CCTracking.Dto;
using CCTracking.Dto.Audit;
using CCTracking.Dto.Response;

namespace CCTracking.Api.Controllers
{
    public class AuditBookingController : ApiController
    {
        [HttpPost]
        public BookingResponse GetAllAuditBooking(AuditRequest request)
        {
            DBFacade facade = new AuditBookingDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(request);
            BookingResponse bookingResponse = (BookingResponse)baseModelResponse;
            BookingResponse response = TransformResultSet(bookingResponse.AuditBookingList);
            return response;
            //return bookingResponse;
        }

        private BookingResponse TransformResultSet(List<AuditBooking> bookings )
        {
            BookingResponse response=new BookingResponse();
            List<AuditDisplay> auditList = new List<AuditDisplay>();
            int counter = 0;
            foreach (AuditBooking each in bookings)
            {
                each.RowCounter = ++counter;
                if (!string.IsNullOrEmpty(each.ContactName))
                    auditList.Add(SetProperty("ContactName", each.ContactName,each));
                if (!string.IsNullOrEmpty(each.ContactMobile))
                    auditList.Add(SetProperty("ContactMobile", each.ContactMobile,each));
                if (!string.IsNullOrEmpty(each.ContactNic))
                    auditList.Add(SetProperty("ContactNic", each.ContactNic,each));
                if (!string.IsNullOrEmpty(each.DeseasedName))
                    auditList.Add(SetProperty("DeseasedName", each.DeseasedName,each));
                if (!string.IsNullOrEmpty(each.DeseasedAge ))
                    auditList.Add(SetProperty("DeseasedAge", each.DeseasedAge,each));
                if (!string.IsNullOrEmpty(each.DeseasedGender))
                    auditList.Add(SetProperty("DeseasedGender", each.DeseasedGender,each));
                if (!string.IsNullOrEmpty(each.CauseOfDeath ))
                    auditList.Add(SetProperty("CauseOfDeath", each.CauseOfDeath,each));
                if (!string.IsNullOrEmpty(each.Address))
                    auditList.Add(SetProperty("Address", each.Address,each));
                if (!string.IsNullOrEmpty(each.BusPoint))
                    auditList.Add(SetProperty("BusPoint", each.BusPoint,each));
                if (!string.IsNullOrEmpty(each.LandmarkId))
                    auditList.Add(SetProperty("LandmarkId", each.LandmarkId,each));
                if (!string.IsNullOrEmpty(each.UnionCouncilId))
                    auditList.Add(SetProperty("UnionCouncilId", each.UnionCouncilId,each));
                if (!string.IsNullOrEmpty(each.TownId))
                    auditList.Add(SetProperty("TownId", each.TownId,each));
                if (!string.IsNullOrEmpty(each.PickupDate))
                    auditList.Add(SetProperty("PickupDate", each.PickupDate,each));
                if (!string.IsNullOrEmpty(each.PickupTime))
                    auditList.Add(SetProperty("PickupTime", each.PickupTime,each));
                if (!string.IsNullOrEmpty(each.ReturnTime))
                    auditList.Add(SetProperty("ReturnTime", each.ReturnTime,each));
                if (!string.IsNullOrEmpty(each.GraveyardId))
                    auditList.Add(SetProperty("GraveyardId", each.GraveyardId,each));
                if (!string.IsNullOrEmpty(each.NamazEJanazaHeldIn))
                    auditList.Add(SetProperty("NamazEJanazaHeldIn", each.NamazEJanazaHeldIn,each));
                if (!string.IsNullOrEmpty(each.NamazEJanazaLocation))
                    auditList.Add(SetProperty("NamazEJanazaLocation", each.NamazEJanazaLocation,each));
                if (!string.IsNullOrEmpty(each.MasjidName))
                    auditList.Add(SetProperty("MasjidName", each.MasjidName,each));
                if (!string.IsNullOrEmpty(each.OtherDetail))
                    auditList.Add(SetProperty("OtherDetail", each.OtherDetail,each));
                if (!string.IsNullOrEmpty(each.IsActive))
                    auditList.Add(SetProperty("IsActive", each.IsActive,each));
                if (!string.IsNullOrEmpty(each.ModifiedBy))
                    auditList.Add(SetProperty("ModifiedBy", each.ModifiedBy,each));
                if (!string.IsNullOrEmpty(each.ModifiedDate))
                    auditList.Add(SetProperty("ModifiedDate", each.ModifiedDate,each));
                

            }
            response.AuditBookingDisplayList = auditList;
            return response;
        }

        private AuditDisplay SetProperty(string propName,string propVal,AuditBooking audit)
        {
            return new AuditDisplay
            {
                BookingId = audit.Id,
                PropertyName = propName,
                OldValue = propVal.Split('^')[0],
                NewValue = propVal.Split('^')[1],
                ActualModifiedDate =audit.ActualModifiedDate,
                RowCounter = audit.RowCounter,
                UserName = audit.UserName
            };
        }
    }
}
