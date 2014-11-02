namespace CCTracking.Dto
{
    public enum PaymentTypes
    {
        Cash = 1,
        EasyPaisa = 2
    }

    public enum VisitTypes
    {
        PatrolPump = 1,
        Booking = 2,
        Maintenance = 3,
        Others = 4
    }

    public enum PaymentStaus
    {
        Unpaid = 0,
        Paid = 1,
        Cancel = 2
    }
}