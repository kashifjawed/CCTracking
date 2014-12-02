using System;
using System.Collections.Generic;
using CCTracking.Dto.Response;
using CCTracking.Dto;

namespace CCTracking.DAL
{
    public class DalService
    {
        DBFacade facade = null;
        public BaseModelResponse SavePayment(Payment payment)
        {
            BaseModelResponse paymentResponse = new BaseModelResponse();

            //delete payment if previously added and now modifying
            DeletePayment(payment);
            if (SaveBusVisit(payment))
            {
                facade = new CCTracking.DAL.PaymentDal();
                paymentResponse = facade.Execute(payment);
                //payment = ((PaymentResponse)paymentResponse).PaymentModel;
            }
            else
            {
                paymentResponse.ErrorMessage = "Couldn't save payment! Problem occured while saving BusVists";
            }
            return paymentResponse;
        }

        public BaseModelResponse GetPaymentById(int id)
        {
            facade = new CCTracking.DAL.PaymentDal();
            BaseModelResponse baseModelResponse = facade.GetById(id);
            PaymentResponse paymentResponse = (PaymentResponse)baseModelResponse;
            if (paymentResponse.PaymentModel != null)
                paymentResponse.PaymentModel.BusVisits = GetBusVisit(paymentResponse.PaymentModel.BookingId);
            return baseModelResponse;
        }
        public BaseModelResponse GetBusAvailabilityByCriteria(int id)
        {
            facade = new BusAvailabilityDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new BusAvailability{BookingId = id});
            BusAvailabilityResponse busAvailabilityResponse= (BusAvailabilityResponse)baseModelResponse;
            return baseModelResponse;
        }

        private bool DeletePayment(Payment payment)
        {
            if (payment.BusVisits == null) return false;

            bool flag = false;
            List<BusVisit> busVisitList = GetBusVisitList(payment.BookingId);
            facade = new CCTracking.DAL.BusVisitDal();
            foreach (BusVisit item in busVisitList)
            {
                BusVisit bv = payment.BusVisits.Find(e => e.BusId == item.BusId && e.CentreId == item.CentreId && e.DriverId == item.DriverId);
                if (bv == null)
                {
                    flag = facade.DeleteById(item.Id);
                }

                //if (!payment.BusVisits.Exists(e => (e.BusId == item.BusId && e.CentreId == item.CentreId && e.DriverId == item.DriverId)))
                //{
                //    flag = facade.DeleteById(item.Id);
                //}
                //foreach (BusVisit each in payment.BusVisits)
                //{
                //    if (each.BusId == visit.BusId && each.DriverId == visit.DriverId && each.CentreId == visit.CentreId)
                //    {
                //        break;
                //    }
                //    else

                //}
            }
            return flag;
        }

        private List<BusVisit> GetBusVisitList(int bookingId)
        {
            facade = new CCTracking.DAL.BusVisitDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new BusVisit { BookingId = bookingId });
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse.BusVisitList;

        }

        private List<BusVisit> GetBusVisit(int bookingId)
        {
            List<BusVisit> list = new List<BusVisit>();
            facade = new CCTracking.DAL.BusVisitDal();
            BaseModelResponse baseModelResponse = facade.GetByCriteria(new BusVisit { BookingId = bookingId });
            BusVisitResponse busVisitResponse = (BusVisitResponse)baseModelResponse;
            return busVisitResponse.BusVisitList;
        }

        private bool SaveBusVisit(Payment payment)
        {
            bool flag = false;
            List<BusVisit> busVisit = payment.BusVisits;
            BaseModelResponse response = null;
            if (busVisit != null && busVisit.Count > 0)
            {
                try
                {
                    facade = new CCTracking.DAL.BusVisitDal();
                    foreach (BusVisit visit in busVisit)
                    {
                        if (visit.Id <= 0)
                        {
                            visit.CreatedDate = visit.ModifiedDate = DateTime.Today;
                            visit.CreatedBy = payment.ModifiedBy;
                        }
                        else
                        {
                            visit.ModifiedDate = DateTime.Today;
                        }
                        response = facade.Execute(visit);
                        if (response != null && !string.IsNullOrEmpty(response.ErrorMessage))
                            break;
                    }
                    flag = true;
                }
                catch (Exception ex)
                {
                    flag = false;
                }
                finally
                {
                    if (response != null && !string.IsNullOrEmpty(response.ErrorMessage))
                        flag = false;
                }
            }
            return flag;
        }


    }
}
