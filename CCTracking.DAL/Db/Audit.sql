
/****** Object:  UserDefinedFunction [dbo].[fn_audit_RefundBooking]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_audit_RefundBooking](            
    @seqval as binary(10),      
    @flag as smallint      
    )        
RETURNS VARCHAR(20)        
AS        
BEGIN        
declare @result varchar(max)            
      
select top 1 @result=       
case @flag       
when 1 then convert(varchar,b.BookingId)       
when 2 then convert(varchar,b.ActualBookingAmount)      
when 3 then [dbo].[fn_GetTown](convert(varchar,b.RefundOfficeLocation) )     
when 4 then [dbo].[fn_GetRefundType]( CONVERT(varchar, b.RefundTypeId) )     
when 5 then CONVERT(varchar, b.RefundAmount)      
when 6 then CONVERT(varchar, b.RefundReason)      
when 7 then CONVERT(varchar, b.RefundReceipt)      
when 8 then [dbo].[fn_GetOfficer](CONVERT(varchar, b.RefundOfficer))      
when 9 then CONVERT(varchar, b.IsActive)      
when 10 then CONVERT(varchar, b.CreatedBy)      
when 11 then CONVERT(varchar, b.CreatedDate)      
when 12 then CONVERT(varchar, b.ModifiedBy)      
when 13 then CONVERT(varchar, b.ModifiedDate)      
else ''      
end      
from cdc.dbo_RefundBooking_Ct b where b.__$operation in(2,3) and  b.__$seqval=@seqval      
return @result         
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_audit_payment]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_audit_payment](            
    @seqval as binary(10),      
    @flag as smallint      
    )        
RETURNS VARCHAR(20)        
AS        
BEGIN        
declare @result varchar(max)            
      
select top 1 @result=       
case @flag       
when 1 then convert(varchar,b.BookingId)       
when 2 then [dbo].[fn_GetPaymantType](convert(varchar,b.PaymentType) )     
when 3 then convert(varchar,b.Pricing)      
when 4 then CONVERT(varchar, b.Amount)      
when 5 then [dbo].[fn_GetTown](CONVERT(varchar, b.PaymentLocation) )     
when 6 then [dbo].[fn_GetOfficer](CONVERT(varchar, b.OfficerId))      
when 7 then CONVERT(varchar, b.ReceiptNo)      
when 8 then CONVERT(varchar, b.ExtraAmountCharge)      
when 9 then CONVERT(varchar, b.ExtraAmountReason)      
when 10 then CONVERT(varchar, b.ExtraAmountReceipt)      
when 11 then [dbo].[fn_PaymentStatus](CONVERT(varchar, b.PaymentStatus))      
when 12 then CONVERT(varchar, b.EasyPaisaTranNo)      
when 13 then CONVERT(varchar, b.CreatedBy)      
when 14 then CONVERT(varchar, b.CreatedDate)      
when 15 then CONVERT(varchar, b.ModifiedBy)      
when 16 then CONVERT(varchar, b.ModifiedDate)      
else ''      
end      
from cdc.dbo_payment_Ct b where b.__$operation in(2,3) and  b.__$seqval=@seqval      
return @result         
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_audit_booking]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_audit_booking](              
    @seqval as binary(10),        
    @flag as smallint        
    )          
RETURNS VARCHAR(20)          
AS          
BEGIN          
declare @result varchar(max)              
        
select top 1 @result=         
case @flag         
when 1 then isnull(b.contactName,'')         
when 2 then isnull(b.ContactMobile,'')        
when 3 then isnull(b.ContactNic,'')        
when 4 then CONVERT(varchar, b.DeseasedName)        
when 5 then CONVERT(varchar, b.DeseasedAge)        
when 6 then dbo.fn_GetGender(b.DeseasedGender)        
when 7 then dbo.fn_GetCauseOfDeath(CONVERT(varchar, b.CauseOfDeath))        
when 8 then CONVERT(varchar, b.Address)        
when 9 then CONVERT(varchar, b.BusPoint)        
when 10 then dbo.fn_GetLandmark(CONVERT(varchar, b.LandmarkId))        
when 11 then dbo.fn_GetUnionCouncil(CONVERT(varchar, b.UnionCouncilId))        
when 12 then dbo.fn_GetTown(CONVERT(varchar, b.TownId))        
when 13 then CONVERT(varchar, b.PickupDate)        
when 14 then dbo.[fn_GetTimeSlot](CONVERT(varchar, b.PickupTime))        
when 15 then dbo.[fn_GetTimeSlot](CONVERT(varchar, b.ReturnTime))        
when 16 then dbo.[fn_GetGraveyard](CONVERT(varchar, b.GraveyardId))        
when 17 then dbo.[fn_GetParyer]( CONVERT(varchar, b.NamazEJanazaHeldIn))        
when 18 then CONVERT(varchar, b.NamazEJanazaLocation)        
when 19 then CONVERT(varchar, b.MasjidName)        
when 20 then CONVERT(varchar, b.OtherDetail)        
when 21 then CONVERT(varchar, b.IsActive)        
when 22 then CONVERT(varchar, b.ModifiedBy)        
when 23 then CONVERT(varchar, b.ModifiedDate)        
else ''        
end        
from cdc.dbo_booking_Ct b where b.__$operation in(2,3) and  b.__$seqval=@seqval        
return @result           
end
GO
/****** Object:  StoredProcedure [dbo].[Audit_RefundBooking]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Audit_RefundBooking]    
@FromDate datetime,
@ToDate datetime
as    
DECLARE @from_lsn binary (10),@to_lsn binary (10)     
DECLARE @BookingId int,@ActualBookingAmount int,@RefundOfficeLocation int,@RefundTypeId int,@Amount int,@RefundAmount int,@RefundReason int,@RefundReceipt int,@RefundOfficer int,@IsActive int,@ModifiedDate int,@CreatedDate int,@ModifiedBy int,@CreatedBy int    
    
SET @from_lsn = sys.fn_cdc_get_min_lsn('dbo_RefundBooking')     
SET @to_lsn = sys.fn_cdc_get_max_lsn()     
SET @BookingId = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'BookingId')     
SET @ActualBookingAmount = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'ActualBookingAmount')     
SET @RefundOfficeLocation = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundOfficeLocation')     
SET @RefundTypeId = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundTypeId')       
SET @RefundAmount = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundAmount')     
SET @RefundReason  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundReason')     
SET @RefundReceipt  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundReceipt')     
SET @RefundOfficer  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'RefundOfficer')     
SET @IsActive  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'IsActive')     
SET @CreatedBy  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'CreatedBy')     
SET @CreatedDate  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'CreatedDate') 
SET @ModifiedBy  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'ModifiedBy')     
SET @ModifiedDate  = sys.fn_cdc_get_column_ordinal('dbo_RefundBooking', 'ModifiedDate') 

  
SELECT     
a.__$seqval,a.__$update_mask ,a.__$operation as opType,    
case sys.fn_cdc_is_bit_set(@BookingId, a.__$update_mask) when 1 then  [dbo].[fn_audit_RefundBooking](a.__$seqval,1) + '^' + a.BookingId   end 'BookingId' ,    
case sys.fn_cdc_is_bit_set(@ActualBookingAmount, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,2) + '^' + a.ActualBookingAmount   end  'ActualBookingAmount' ,    
case sys.fn_cdc_is_bit_set(@RefundOfficeLocation, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,3) + '^' + [dbo].[fn_GetTown](convert(varchar,a.RefundOfficeLocation))   end  'RefundOfficeLocation' ,    
case sys.fn_cdc_is_bit_set(@RefundTypeId, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,4) + '^' + a.RefundTypeId end  'RefundTypeId' ,    
case sys.fn_cdc_is_bit_set(@RefundAmount, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,5) + '^' + convert(varchar, a.RefundAmount)   end  'RefundAmount' ,    
case sys.fn_cdc_is_bit_set(@RefundReason, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,6) + '^' + convert(varchar, a.RefundReason)   end  'RefundReason' ,    
case sys.fn_cdc_is_bit_set(@RefundReceipt, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,7) + '^' + convert(varchar, a.RefundReceipt)   end  'RefundReceipt' ,    
case sys.fn_cdc_is_bit_set(@RefundOfficer, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,8) + '^' + dbo.fn_GetOfficer(convert(varchar, a.RefundOfficer))   end  'RefundOfficer' ,    
case sys.fn_cdc_is_bit_set(@IsActive, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,9) + '^' + convert(varchar, a.IsActive)   end  'IsActive' ,    
case sys.fn_cdc_is_bit_set(@ModifiedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,10) + '^' + convert(varchar, a.CreatedBy)   end  'CreatedBy' ,    
case sys.fn_cdc_is_bit_set(@CreatedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,11) + '^' + convert(varchar, a.CreatedDate)   end  'CreatedDate' , 
case sys.fn_cdc_is_bit_set(@ModifiedBy, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,12) + '^' + convert(varchar, a.ModifiedBy)   end  'ModifiedBy' ,    
case sys.fn_cdc_is_bit_set(@ModifiedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_RefundBooking](a.__$seqval,13) + '^' + convert(varchar, a.ModifiedDate)   end  'ModifiedDate' ,      

a.ModifiedDate as ActualModifiedDate,a.Id,u.UserName 
FROM [cdc].[fn_cdc_get_all_changes_dbo_RefundBooking](@from_lsn, @to_lsn, 'all') a   
inner join [User] u on u.Id=a.ModifiedBy
where a.__$operation not in(2) and a.ModifiedDate between @FromDate and @ToDate
--inner join cdc.dbo_RefundBooking_Ct b on b.__$seqval=a.__$seqval    
ORDER BY a.__$seqval
GO
/****** Object:  StoredProcedure [dbo].[Audit_Payment]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Audit_Payment]    
@FromDate datetime,
@ToDate datetime
as    
DECLARE @from_lsn binary (10),@to_lsn binary (10)     
DECLARE @BookingId int,@PaymentType int,@Pricing int,@Amount int,@PaymentLocation int,@OfficerId int,@ReceiptNo int,@ExtraAmountCharge int,@ExtraAmountReason int,@ExtraAmountReceipt int,@PaymentStatus int,@EasyPaisaTranNo int,@CreatedBy int,@CreatedDate int,@ModifiedBy int,@ModifiedDate int    
    
SET @from_lsn = sys.fn_cdc_get_min_lsn('dbo_payment')     
SET @to_lsn = sys.fn_cdc_get_max_lsn()     
SET @BookingId = sys.fn_cdc_get_column_ordinal('dbo_payment', 'BookingId')     
SET @PaymentType = sys.fn_cdc_get_column_ordinal('dbo_payment', 'PaymentType')     
SET @Pricing = sys.fn_cdc_get_column_ordinal('dbo_payment', 'Pricing')     
  
SET @Amount= sys.fn_cdc_get_column_ordinal('dbo_payment', 'Amount')     
SET @PaymentLocation = sys.fn_cdc_get_column_ordinal('dbo_payment', 'PaymentLocation')     
SET @OfficerId  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'OfficerId')     
SET @ReceiptNo  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ReceiptNo')     
SET @ExtraAmountCharge  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ExtraAmountCharge')     
SET @ExtraAmountReason  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ExtraAmountReason')     
SET @ExtraAmountReceipt  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ExtraAmountReceipt')     
SET @PaymentStatus  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'PaymentStatus')     
SET @EasyPaisaTranNo  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'EasyPaisaTranNo')     
SET @CreatedBy  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'CreatedBy')     
SET @CreatedDate  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'CreatedDate')     
SET @ModifiedBy  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ModifiedBy')     
SET @ModifiedDate  = sys.fn_cdc_get_column_ordinal('dbo_payment', 'ModifiedDate')     

  
SELECT     
a.__$seqval,a.__$update_mask ,a.__$operation as opType,    
case sys.fn_cdc_is_bit_set(@BookingId, a.__$update_mask) when 1 then  [dbo].[fn_audit_payment](a.__$seqval,1) + '^' + a.BookingId   end 'BookingId' ,    
case sys.fn_cdc_is_bit_set(@PaymentType, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,2) + '^' + dbo.fn_GetPaymantType(convert(varchar,a.PaymentType))   end  'PaymentType' ,    
case sys.fn_cdc_is_bit_set(@Pricing, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,3) + '^' + a.Pricing end  'Pricing' ,    
  
case sys.fn_cdc_is_bit_set(@Amount, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,4) + '^' + convert(varchar, a.Amount)   end  'Amount' ,    
case sys.fn_cdc_is_bit_set(@PaymentLocation, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,5) + '^' + dbo.fn_GetTown(convert(varchar, a.PaymentLocation))   end  'PaymentLocation' ,    
case sys.fn_cdc_is_bit_set(@OfficerId, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,6) + '^' + dbo.fn_GetOfficer(convert(varchar, a.OfficerId))   end  'OfficerId' ,    
case sys.fn_cdc_is_bit_set(@ReceiptNo, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,7) + '^' + convert(varchar, a.ReceiptNo)   end  'ReceiptNo' ,    
case sys.fn_cdc_is_bit_set(@ExtraAmountCharge, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,8) + '^' + convert(varchar, a.ExtraAmountCharge)   end  'ExtraAmountCharge' ,    
case sys.fn_cdc_is_bit_set(@ExtraAmountReason, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,9) + '^' + convert(varchar, a.ExtraAmountReason)   end  'ExtraAmountReason' ,    
case sys.fn_cdc_is_bit_set(@ExtraAmountReceipt, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,10) + '^' + convert(varchar, a.ExtraAmountReceipt)   end  'ExtraAmountReceipt' ,    
case sys.fn_cdc_is_bit_set(@PaymentStatus, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,11) + '^' + dbo.fn_PaymentStatus(convert(varchar, a.PaymentStatus))   end  'PaymentStatus' ,    
case sys.fn_cdc_is_bit_set(@EasyPaisaTranNo, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,12) + '^' + convert(varchar, a.EasyPaisaTranNo)   end  'EasyPaisaTranNo' ,    
case sys.fn_cdc_is_bit_set(@CreatedBy, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,13) + '^' + convert(varchar, a.CreatedBy)   end  'CreatedBy' ,    
case sys.fn_cdc_is_bit_set(@CreatedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,14) + '^' + convert(varchar, a.CreatedDate)   end  'CreatedDate' ,    
case sys.fn_cdc_is_bit_set(@ModifiedBy, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,15) + '^' + convert(varchar, a.ModifiedBy)   end  'ModifiedBy' ,    
case sys.fn_cdc_is_bit_set(@ModifiedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_payment](a.__$seqval,16) + '^' + convert(varchar, a.ModifiedDate)   end  'ModifiedDate' ,    
a.ModifiedDate as ActualModifiedDate,a.Id,u.UserName 
FROM [cdc].[fn_cdc_get_all_changes_dbo_payment](@from_lsn, @to_lsn, 'all') a   
inner join [User] u on u.Id=a.ModifiedBy
where a.__$operation not in(2) and a.ModifiedDate between @FromDate and @ToDate
--inner join cdc.dbo_payment_Ct b on b.__$seqval=a.__$seqval    
ORDER BY a.__$seqval
GO
/****** Object:  StoredProcedure [dbo].[Audit_Booking]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Audit_Booking]    
@FromDate datetime,
@ToDate datetime
as    
DECLARE @from_lsn binary (10),@to_lsn binary (10)     
DECLARE @ContactName int,@ContactMobile int,@ContactNic int,@DeseasedName int,@DeseasedAge int,@DeseasedGender int,@CauseOfDeath int,@Address int,@BusPoint int,@LandmarkId int,@UnionCouncilId int,@TownId int,@PickupDate int,@PickupTime int,@ReturnTime int
,@GraveyardId int,@NamazEJanazaHeldIn int,@NamazEJanazaLocation int,@MasjidName int,@OtherDetail int,@IsActive int,@ModifiedBy int,@ModifiedDate int  
    
    
SET @from_lsn = sys.fn_cdc_get_min_lsn('dbo_booking')     
SET @to_lsn = sys.fn_cdc_get_max_lsn()     
SET @ContactName = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ContactName')     
SET @ContactMobile = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ContactMobile')     
SET @ContactNic = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ContactNic')     
  
SET @DeseasedName= sys.fn_cdc_get_column_ordinal('dbo_booking', 'DeseasedName')     
SET @DeseasedAge = sys.fn_cdc_get_column_ordinal('dbo_booking', 'DeseasedAge')     
SET @DeseasedGender  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'DeseasedGender')     
SET @CauseOfDeath  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'CauseOfDeath')     
SET @Address  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'Address')     
SET @BusPoint  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'BusPoint')     
SET @LandmarkId  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'LandmarkId')     
SET @UnionCouncilId  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'UnionCouncilId')     
SET @TownId  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'TownId')     
SET @PickupDate  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'PickupDate')     
SET @PickupTime  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'PickupTime')     
SET @ReturnTime  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ReturnTime')     
SET @GraveyardId  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'GraveyardId')     
SET @NamazEJanazaHeldIn  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'NamazEJanazaHeldIn')     
SET @NamazEJanazaLocation  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'NamazEJanazaLocation')     
SET @MasjidName  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'MasjidName')     
SET @OtherDetail  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'OtherDetail')     
SET @IsActive  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'IsActive')     
SET @ModifiedBy  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ModifiedBy')     
SET @ModifiedDate  = sys.fn_cdc_get_column_ordinal('dbo_booking', 'ModifiedDate')     
  
SELECT     
a.__$seqval,a.__$update_mask ,a.__$operation as opType,    
case sys.fn_cdc_is_bit_set(@ContactName, a.__$update_mask) when 1 then  [dbo].[fn_audit_booking](a.__$seqval,1) + '^' + a.ContactName   end 'ContactName' ,    
case sys.fn_cdc_is_bit_set(@ContactMobile, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,2) + '^' + a.ContactMobile   end  'ContactMobile' ,    
case sys.fn_cdc_is_bit_set(@ContactNic, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,3) + '^' + a.ContactNic end  'ContactNic' ,    
  
case sys.fn_cdc_is_bit_set(@DeseasedName, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,4) + '^' + convert(varchar, a.DeseasedName)   end  'DeseasedName' ,    
case sys.fn_cdc_is_bit_set(@DeseasedAge, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,5) + '^' + convert(varchar, a.DeseasedAge)   end  'DeseasedAge' ,    
case sys.fn_cdc_is_bit_set(@DeseasedGender, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,6) + '^' +  dbo.fn_GetGender(a.DeseasedGender)   end  'DeseasedGender' ,    
case sys.fn_cdc_is_bit_set(@CauseOfDeath, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,7) + '^' + dbo.fn_GetCauseOfDeath(convert(varchar, a.CauseOfDeath))   end  'CauseOfDeath' ,    
case sys.fn_cdc_is_bit_set(@Address, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,8) + '^' + convert(varchar, a.Address)   end  'Address' ,    
case sys.fn_cdc_is_bit_set(@BusPoint, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,9) + '^' + dbo.fn_GetTown(convert(varchar, a.BusPoint))   end  'BusPoint' ,    
case sys.fn_cdc_is_bit_set(@LandmarkId, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,10) + '^' + dbo.fn_GetLandmark(convert(varchar, a.LandmarkId))   end  'LandmarkId' ,    
case sys.fn_cdc_is_bit_set(@UnionCouncilId, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,11) + '^' + dbo.fn_GetUnionCouncil(convert(varchar, a.UnionCouncilId))   end  'UnionCouncilId' ,    
case sys.fn_cdc_is_bit_set(@TownId, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,12) + '^' + dbo.fn_GetTown(convert(varchar, a.TownId))   end  'TownId' ,    
case sys.fn_cdc_is_bit_set(@PickupDate, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,13) + '^' + convert(varchar, a.PickupDate)   end  'PickupDate' ,    
case sys.fn_cdc_is_bit_set(@PickupTime, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,14) + '^' + dbo.fn_GetTimeSlot(convert(varchar, a.PickupTime))   end  'PickupTime' ,    
case sys.fn_cdc_is_bit_set(@ReturnTime, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,15) + '^' + dbo.fn_GetTimeSlot(convert(varchar, a.ReturnTime))   end  'ReturnTime' ,    
case sys.fn_cdc_is_bit_set(@GraveyardId, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,16) + '^' + dbo.fn_GetGraveyard(convert(varchar, a.GraveyardId))   end  'GraveyardId' ,    
case sys.fn_cdc_is_bit_set(@NamazEJanazaHeldIn, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,17) + '^' + dbo.fn_GetParyer(convert(varchar, a.NamazEJanazaHeldIn))   end  'NamazEJanazaHeldIn' ,    
case sys.fn_cdc_is_bit_set(@NamazEJanazaLocation, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,18) + '^' + convert(varchar, a.NamazEJanazaLocation)   end  'NamazEJanazaLocation' ,    
case sys.fn_cdc_is_bit_set(@MasjidName, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,19) + '^' + convert(varchar, a.MasjidName)   end  'MasjidName' ,    
case sys.fn_cdc_is_bit_set(@OtherDetail, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,20) + '^' + convert(varchar, a.OtherDetail)   end  'OtherDetail' ,    
case sys.fn_cdc_is_bit_set(@IsActive, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,21) + '^' + convert(varchar, a.IsActive)   end  'IsActive' ,    
case sys.fn_cdc_is_bit_set(@ModifiedBy, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,22) + '^' + convert(varchar, a.ModifiedBy)   end  'ModifiedBy' ,    
case sys.fn_cdc_is_bit_set(@ModifiedDate, a.__$update_mask) when 1 then [dbo].[fn_audit_booking](a.__$seqval,23) + '^' + convert(varchar, a.ModifiedDate)   end  'ModifiedDate',   
a.ModifiedDate as ActualModifiedDate,a.Id,u.UserName 
FROM [cdc].[fn_cdc_get_all_changes_dbo_booking](@from_lsn, @to_lsn, 'all') a   
inner join [User] u on u.Id=a.ModifiedBy
where a.__$operation not in(2) and a.ModifiedDate between @FromDate and @ToDate
--inner join cdc.dbo_booking_Ct b on b.__$seqval=a.__$seqval    
ORDER BY a.__$seqval
GO