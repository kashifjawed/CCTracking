using System;
namespace CCTracking.Dto.Audit
{
    public class AuditRequest: BaseModel
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }
}
