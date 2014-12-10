using System;

namespace CCTracking.Dto
{
    public class SearchCriteria : BaseModel
    {
        public string ContactInfo { get; set; }
        public string DeseasedInfo { get; set; }
        public byte GenderId { get; set; }
        public short PaymentStatusId { get; set; }
        public DateTime BookingDate { get; set; }
        public short GreveyardId { get; set; }
        public short CentreId { get; set; }
        public short BusId { get; set; }
        public DateTime FromBookingDate { get; set; }
        public DateTime ToBookingDate { get; set; }
        public DateTime FromVisitDate { get; set; }
        public DateTime ToVisitDate { get; set; }

        public SearchCriteria()
        {
            this.PaymentStatusId = -1;
        }


    }

    public interface IBase
    {
        void BaseMetod(int i);
    }

    public abstract class Base
    {
        protected abstract void BaseMetod(int i);

    }

    public class Drived : Base
    {
        protected override void BaseMetod(int i)
        {

        }
        //public void DriveMethod()
        //{
        //    BaseMetod(2);
        //}
    }
}
