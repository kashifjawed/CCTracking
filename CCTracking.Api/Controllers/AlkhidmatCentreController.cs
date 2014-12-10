using CCTracking.DAL;
using CCTracking.Dto.Response;
using System;
using System.Web.Http;

namespace CCTracking.Api.Controllers
{
    public class AlkhidmatCentreController : ApiController
    {
        //BookingStore _bookingStore = new BookingStore();        
        static int rowCounter = 1;

        [HttpPost]
        public CCTracking.Dto.AlkhidmatCentre SaveAlkhidmatCentre(CCTracking.Dto.AlkhidmatCentre alkhidmatCentre)
        {
            if (alkhidmatCentre != null)
            {
                //booking.Id = rowCounter++;
                DBFacade facade = new CCTracking.DAL.CentreDal();
                if (alkhidmatCentre.Id <= 0)
                {
                    alkhidmatCentre.CreatedDate = alkhidmatCentre.ModifiedDate = DateTime.Today;
                    alkhidmatCentre.CreatedBy = alkhidmatCentre.ModifiedBy;
                }
                else
                {
                    alkhidmatCentre.ModifiedDate = DateTime.Today;
                }
                BaseModelResponse centreResponse = facade.Execute(alkhidmatCentre);
                //var a = facade.Execute(booking);
                alkhidmatCentre = ((CentreResponse)centreResponse).CentreModel;
                //bookings.Add(booking);
            }
            return alkhidmatCentre;
        }

        [HttpGet]
        public LookupResponse AlkhidmatCentreDefault()
        {
            DBFacade facade = new CCTracking.DAL.LookupDal();
            BaseModelResponse baseModelResponse = facade.ExecuteDs(null);
            LookupResponse lookupResponse = (LookupResponse)baseModelResponse;
            return lookupResponse;
        }

        [HttpGet]
        public CentreResponse GetAll(string a)
        {
            DBFacade facade = new CCTracking.DAL.CentreDal();
            BaseModelResponse baseModelResponse = facade.GetAll();
            CentreResponse centreResponse = (CentreResponse)baseModelResponse;
            return centreResponse;
        }
        
        [HttpGet]
        public CentreResponse GetById(int id)
        {
            DBFacade facade = new CCTracking.DAL.CentreDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            CentreResponse centreResponse = (CentreResponse)baseModelResponse;
            return centreResponse;
        }
    }
}
