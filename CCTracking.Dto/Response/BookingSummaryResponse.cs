using System;
using System.Collections.Generic;

namespace CCTracking.Dto.Response
{
    public class BookingSummaryResponse : BaseModelResponse
    {
        public BookingSummary BookingSummaryModel { get; set; }
        public List<BookingSummary> BookingSummaryList { get; set; }
    }
}
