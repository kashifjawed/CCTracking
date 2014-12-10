using System;

namespace CCTracking.Dto.Audit
{
    public class AuditDisplay 
    {
        public int BookingId { get; set; }
        public string PropertyName { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public DateTime ActualModifiedDate { get; set; }
        public int RowCounter { get; set; }
        public string UserName { get; set; }
    }
}
