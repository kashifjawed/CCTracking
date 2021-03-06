USE [CCTracking]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Role](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Role] ON
INSERT [dbo].[Role] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Admin', 1, 1, CAST(0x0000A38201554BCD AS DateTime), 1, CAST(0x0000A38201554BCD AS DateTime))
INSERT [dbo].[Role] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Operator', 1, 1, CAST(0x0000A3820155637B AS DateTime), 1, CAST(0x0000A3820155637B AS DateTime))
INSERT [dbo].[Role] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Non System User', 1, 1, CAST(0x0000A3820155637B AS DateTime), 1, CAST(0x0000A3820155637B AS DateTime))
SET IDENTITY_INSERT [dbo].[Role] OFF
/****** Object:  UserDefinedFunction [dbo].[GetPrayerTime]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetPrayerTime](      
    @PrayerId as int  
)  
RETURNS VARCHAR(20)  
AS  
BEGIN  
declare @result varchar(20)      
select @result=case @PrayerId
when 1 then 'Fajr'
when 2 then 'Before Dhuhr'
when 3 then 'Dhuhr/Juma''ah'
when 4 then 'Asr'
when 5 then 'Maghrib'
when 6 then 'Isha''a'
when 7 then 'After Isha''a'
else ''
end 
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[GetBusStatus]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  FUNCTION [dbo].[GetBusStatus](      
    @BusStatus as int  
)  
RETURNS VARCHAR(20)  
AS  
BEGIN  
declare @result varchar(20)      
select @result=case @BusStatus 
when 1 then 'Available'
when 2 then 'Booked - Unpaid'
when 3 then 'Booked - Paid'
when 4 then 'Available Soon'
when 5 then 'Maintenance'
when 6 then 'Puncher'
when 7 then 'Unavailable'
else 'Available'
end 
--from Bus where id=@BusId

return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetParyer]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetParyer](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = case when @id = 1 then 'Fajr' 
when @Id=2 then 'Before Dhuhr'
when @Id=3 then 'Dhuhr/Juma''ah'
when @Id=4 then 'Asr'
when @Id=5 then 'Maghrib'
when @Id=6 then 'Isha''a'
when @Id=7 then 'After Isha''a' end
return @result   
end
GO
/****** Object:  Table [dbo].[Landmark]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Landmark](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UcId] [int] NOT NULL,
	[Name] [nvarchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Landmark] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Landmark] ON
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, N'DEH IBRAHIM HAIDERY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 2, N'DEH GHUNGRU', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 2, N'DEH REHRI', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 3, N'CATTLE COLONY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 3, N'LABOUR SQUARE', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 3, N'MACHINE TOOL FACTORY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 3, N'MUSLIM LEAGUE COLONY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 4, N'AFRIDI COLONY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 4, N'GULISTAN SOCIETY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 4, N'KOHATI COLONY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 4, N'LAIQABAD', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 4, N'QADDAFI TOWN', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 4, N'UMER MARVI GOTH', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 4, N'ZAFAR TOWN', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 5, N'DEH KHANTO', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 5, N'DEH LANDHI', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 5, N'DEH SANHRO', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 5, N'KHAKHAR', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, 6, N'DEH JOHERIJI SOME PART ON NORTH NATIONAL HIGHWAY', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, 6, N'GULSHAN E HADEED', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, 6, N'NISHTERABAD', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, 6, N'STEEL TOWN', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (23, 6, N'ZULFIQARABAD FROM OIL TERMINAL TO LINK ROAD', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (24, 7, N'BAKRAN', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (25, 7, N'DEH JOHERIJI SOME PART EXCLUDING UC GULSHAN E ', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (26, 7, N'DEH PEEPRI', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (27, 7, N'DHABEJI', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (28, 7, N'DHANDHO', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (29, 7, N'GHAGHAR', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (30, 7, N'KOTRERO', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (31, 8, N'a', 1, 1, CAST(0x0000A3760002C57B AS DateTime), 1, CAST(0x0000A3760002C57B AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (32, 10, N'abcv', 1, 2, CAST(0x0000A3AD001B3D08 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (33, 2, N'sdfsfsfs', 1, 2, CAST(0x0000A3D3008FC9A9 AS DateTime), 2, CAST(0x0000A3D300000000 AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (34, 1, N'aa', 0, 10, CAST(0x0000A3D50112702D AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (35, 1, N'aaaa', 0, 10, CAST(0x0000A3D501128557 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
INSERT [dbo].[Landmark] ([Id], [UcId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (36, 1, N'abc', 1, 10, CAST(0x0000A3D501130677 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Landmark] OFF
/****** Object:  Table [dbo].[Graveyard]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Graveyard](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[LandmarkId] [int] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Graveyard] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Graveyard] ON
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, N'Saqi Hasan', 1, 1, CAST(0x0000A37800FBA62F AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 2, N'Tariq Road', 1, 1, CAST(0x0000A37800FBA62F AS DateTime), 1, CAST(0x0000A37800FBA62F AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 3, N'Gora Qaberistan', 1, 1, CAST(0x0000A37800FBA62F AS DateTime), 1, CAST(0x0000A37800FBA62F AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 4, N'Rarhi', 1, 1, CAST(0x0000A37800FBA62F AS DateTime), 1, CAST(0x0000A37800FBA62F AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 4, N'Ibrahim Hyderi', 1, 1, CAST(0x0000A37800FBA62F AS DateTime), 10, CAST(0x0000A3D600000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 1, N'Hussainabad', 1, 2, CAST(0x0000A3AD000FB709 AS DateTime), 10, CAST(0x0000A3D600000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 1, N'Yasinabad', 1, 2, CAST(0x0000A3AD001058BF AS DateTime), 10, CAST(0x0000A3D600000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 1, N'new graveyard', 1, 2, CAST(0x0000A3AD001060A3 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 4, N'new', 1, 2, CAST(0x0000A3AD00113905 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 9, N'new', 1, 2, CAST(0x0000A3AD0011E095 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 13, N'abc', 1, 2, CAST(0x0000A3AD001260D7 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 13, N'abc', 1, 2, CAST(0x0000A3AD00129F21 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 11, N'abc', 1, 2, CAST(0x0000A3AD0012D192 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 11, N'abc', 1, 2, CAST(0x0000A3AD0012EAD0 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 11, N'abc', 1, 2, CAST(0x0000A3AD001356E6 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 2, N'fffff', 0, 2, CAST(0x0000A3D3008FED41 AS DateTime), 2, CAST(0x0000A3D300000000 AS DateTime))
INSERT [dbo].[Graveyard] ([Id], [LandmarkId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 1, N'ga', 1, 10, CAST(0x0000A3D50113EAC0 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Graveyard] OFF
/****** Object:  Table [dbo].[RefundType]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefundType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_RefundType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[RefundType] ON
INSERT [dbo].[RefundType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Funeral Poponed', 1, 1, CAST(0x0000A37C010E8937 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[RefundType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Hire Other service', 1, 1, CAST(0x0000A37C010E99D6 AS DateTime), 1, CAST(0x0000A37C010E99D6 AS DateTime))
INSERT [dbo].[RefundType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Other', 1, 1, CAST(0x0000A37C010EA369 AS DateTime), 1, CAST(0x0000A37C010EA369 AS DateTime))
INSERT [dbo].[RefundType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'new3', 1, 2, CAST(0x0000A3AD00265B8F AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[RefundType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'another refund type', 1, 10, CAST(0x0000A3D501145207 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[RefundType] OFF
/****** Object:  Table [dbo].[RefundBooking]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RefundBooking](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BookingId] [int] NULL,
	[ActualBookingAmount] [money] NULL,
	[RefundOfficeLocation] [int] NULL,
	[RefundTypeId] [int] NULL,
	[RefundAmount] [money] NULL,
	[RefundReason] [nvarchar](500) NULL,
	[RefundReceipt] [nvarchar](50) NULL,
	[RefundOfficer] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_RefundBooking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[RefundBooking] ON
INSERT [dbo].[RefundBooking] ([Id], [BookingId], [ActualBookingAmount], [RefundOfficeLocation], [RefundTypeId], [RefundAmount], [RefundReason], [RefundReceipt], [RefundOfficer], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (31, 125, 2000.0000, 7, 1, 1800.0000, N'booked another bus', N'2121212', 3, 1, 10, CAST(0x0000A3F90106AB58 AS DateTime), 10, CAST(0x0000A3F900000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[RefundBooking] OFF
/****** Object:  Table [dbo].[PaymentType]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_PaymentType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[PaymentType] ON
INSERT [dbo].[PaymentType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Cash', 1, 1, CAST(0x0000A38900230B4A AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[PaymentType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'EasyPaisa', 1, 1, CAST(0x0000A389002323C5 AS DateTime), 1, CAST(0x0000A389002323C5 AS DateTime))
INSERT [dbo].[PaymentType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'new type6', 1, 2, CAST(0x0000A3AD001EFB48 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[PaymentType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'Smart Money', 1, 2, CAST(0x0000A3D3009052F5 AS DateTime), 2, CAST(0x0000A3D300000000 AS DateTime))
INSERT [dbo].[PaymentType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'new payment type', 1, 10, CAST(0x0000A3D501140013 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[PaymentType] OFF
/****** Object:  Table [dbo].[Payment]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BookingId] [int] NOT NULL,
	[PaymentType] [tinyint] NOT NULL,
	[Pricing] [tinyint] NULL,
	[Amount] [money] NOT NULL,
	[PaymentLocation] [int] NULL,
	[OfficerId] [int] NULL,
	[ReceiptNo] [nvarchar](50) NULL,
	[ExtraAmountCharge] [money] NULL,
	[ExtraAmountReason] [nvarchar](500) NULL,
	[ExtraAmountReceipt] [nvarchar](50) NULL,
	[PaymentStatus] [tinyint] NULL,
	[EasyPaisaTranNo] [nchar](30) NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_BookingPayment] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Payment] ON
INSERT [dbo].[Payment] ([Id], [BookingId], [PaymentType], [Pricing], [Amount], [PaymentLocation], [OfficerId], [ReceiptNo], [ExtraAmountCharge], [ExtraAmountReason], [ExtraAmountReceipt], [PaymentStatus], [EasyPaisaTranNo], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (97, 123, 1, NULL, 2000.0000, 1, 3, N'1231312313', 200.0000, N'late', N'121212', 1, NULL, 0, CAST(0x0000A3F900F82D79 AS DateTime), 10, CAST(0x0000A3FA00000000 AS DateTime))
INSERT [dbo].[Payment] ([Id], [BookingId], [PaymentType], [Pricing], [Amount], [PaymentLocation], [OfficerId], [ReceiptNo], [ExtraAmountCharge], [ExtraAmountReason], [ExtraAmountReceipt], [PaymentStatus], [EasyPaisaTranNo], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (98, 124, 2, NULL, 3000.0000, 1, 3, N'2323232', 0.0000, NULL, NULL, 1, N'asasasa                       ', 0, CAST(0x0000A3F900FD9747 AS DateTime), 10, CAST(0x0000A3F900000000 AS DateTime))
INSERT [dbo].[Payment] ([Id], [BookingId], [PaymentType], [Pricing], [Amount], [PaymentLocation], [OfficerId], [ReceiptNo], [ExtraAmountCharge], [ExtraAmountReason], [ExtraAmountReceipt], [PaymentStatus], [EasyPaisaTranNo], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (99, 125, 2, NULL, 2000.0000, 1, 3, N'1212121', 0.0000, NULL, NULL, 2, NULL, 10, CAST(0x0000A3F9010628E4 AS DateTime), 10, CAST(0x0000A3F9010628E4 AS DateTime))
SET IDENTITY_INSERT [dbo].[Payment] OFF
/****** Object:  Table [dbo].[NearestCentre]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NearestCentre](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CentreId] [int] NULL,
	[NearestCentreId] [int] NULL,
	[NearestLevel] [tinyint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_NearestAlkhidmatCentre] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[NearestCentre] ON
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, 9, 2, 1, 1, CAST(0x0000A3A000C1F2EA AS DateTime), 1, CAST(0x0000A3A000C1F2EA AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 1, 11, 3, 1, 1, CAST(0x0000A3A000C21451 AS DateTime), 1, CAST(0x0000A3A000C21451 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 1, 15, 4, 1, 1, CAST(0x0000A3A000C24850 AS DateTime), 1, CAST(0x0000A3A000C24850 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 7, 19, 2, 1, 1, CAST(0x0000A3A000C2AB9E AS DateTime), 1, CAST(0x0000A3A000C2AB9E AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 7, 12, 3, 1, 1, CAST(0x0000A3A000C2CD59 AS DateTime), 1, CAST(0x0000A3A000C2CD59 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 7, 13, 4, 1, 1, CAST(0x0000A3A000C2D71F AS DateTime), 1, CAST(0x0000A3A000C2D71F AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 12, 23, 2, 1, 1, CAST(0x0000A3A000C30ED0 AS DateTime), 1, CAST(0x0000A3A000C30ED0 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 12, 7, 3, 1, 1, CAST(0x0000A3A000C319EF AS DateTime), 1, CAST(0x0000A3A000C319EF AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 12, 19, 4, 1, 1, CAST(0x0000A3A000C32FE6 AS DateTime), 1, CAST(0x0000A3A000C32FE6 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 1, 1, 1, 1, 1, CAST(0x0000A3F90091722A AS DateTime), 1, CAST(0x0000A3F90091722A AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 7, 7, 1, 1, 1, CAST(0x0000A3F9009219C5 AS DateTime), 1, CAST(0x0000A3F9009219C5 AS DateTime))
INSERT [dbo].[NearestCentre] ([Id], [CentreId], [NearestCentreId], [NearestLevel], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 12, 12, 1, 1, 1, CAST(0x0000A3F900922BB0 AS DateTime), 1, CAST(0x0000A3F900922BB0 AS DateTime))
SET IDENTITY_INSERT [dbo].[NearestCentre] OFF
/****** Object:  StoredProcedure [dbo].[SaveNearestCentre]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[SaveNearestCentre] 
@Id	int,
@CentreId	int,
@NearestCentreId	int,
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [NearestAlkhidmatCentre]
	set 
	CentreId =  @CentreId,NearestCentreId = @NearestCentreId,IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [NearestAlkhidmatCentre] where Id = @Id
	end	
	else
	begin
	insert into [NearestAlkhidmatCentre]
	(CentreId,NearestCentreId,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@CentreId,@NearestCentreId,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [NearestAlkhidmatCentre] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  Table [dbo].[VisitType]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VisitType](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_VisitType] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[VisitType] ON
INSERT [dbo].[VisitType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Patrol Pump', 1, 1, CAST(0x0000A38200D3F905 AS DateTime), 1, CAST(0x0000A38200D3F905 AS DateTime))
INSERT [dbo].[VisitType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Booking', 1, 1, CAST(0x0000A38200D3F905 AS DateTime), 1, CAST(0x0000A38200D3F905 AS DateTime))
INSERT [dbo].[VisitType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Maintenance', 1, 1, CAST(0x0000A38200D3F905 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[VisitType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'Others', 1, 1, CAST(0x0000A38200D3F905 AS DateTime), 1, CAST(0x0000A38200D3F905 AS DateTime))
INSERT [dbo].[VisitType] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'new1', 1, 2, CAST(0x0000A3AD0027EBC8 AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[VisitType] OFF
/****** Object:  Table [dbo].[User]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CentreId] [int] NOT NULL,
	[RoleId] [int] NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](100) NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[CNIC] [nvarchar](13) NULL,
	[Mobile] [nvarchar](13) NULL,
	[Email] [nvarchar](100) NULL,
	[Address] [nvarchar](200) NULL,
	[City] [nvarchar](50) NULL,
	[FromDate] [datetime] NULL,
	[ToDate] [datetime] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [Unique_User] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[User] ON
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 12, 1, N'kashif', N'Nk9TUUs1bUdNR1U90', N'kashif', N'jawed', N'4220102554137', N'03332392050', NULL, N'korangi', N'karachi', CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 1, 1, CAST(0x0000A3820130025D AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 12, 2, N'saeed', N'SjBROTNkd2JEYW890', N'saeed', N'ahmed', N'78688768', N'667686', N'sasa@dada.com', N'landhi', N'karachi', CAST(0x0000A3BA00000000 AS DateTime), CAST(0x0000A3BA00000000 AS DateTime), 1, 1, CAST(0x0000A382013032C2 AS DateTime), 2, CAST(0x0000A3BA00000000 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 1, 3, N'cashier-1', N'Nk9TUUs1bUdNR1U90', N'cashier-1', N'cashier-1', N'78688768', N'667686', NULL, N'address', N'city', NULL, NULL, 1, 1, CAST(0x0000A382013032C2 AS DateTime), 1, CAST(0x0000A382013032C2 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 1, 3, N'cashier-2', N'Nk9TUUs1bUdNR1U90', N'cashier-2', N'cashier-2', N'78688768', N'667686', NULL, N'address', N'city', NULL, NULL, 1, 1, CAST(0x0000A382013032C2 AS DateTime), 1, CAST(0x0000A382013032C2 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 1, 3, N'cashier-3', N'Nk9TUUs1bUdNR1U90', N'cashier-3', N'cashier-3', N'78688768', N'667686', NULL, N'address', N'city', NULL, NULL, 1, 1, CAST(0x0000A382013032C2 AS DateTime), 1, CAST(0x0000A382013032C2 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 1, 3, N'cashier-4', N'Nk9TUUs1bUdNR1U90', N'cashier-3', N'cashier-3', N'78688768', N'667686', NULL, N'address', N'city', NULL, NULL, 1, 1, CAST(0x0000A382013032C2 AS DateTime), 1, CAST(0x0000A382013032C2 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 2, 2, N'jhkjhkjh', N'Nk9TUUs1bUdNR1U90', N'hjhkh', N'hhjhj', N'89898', N'898980', N'sdsd@dss.com', N'hjhjkh', N'hjhkh', CAST(0x0000A3BA00000000 AS DateTime), CAST(0x0000A3BA00000000 AS DateTime), 1, 2, CAST(0x0000A3BA010688A3 AS DateTime), 2, CAST(0x0000A3BA010688A3 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 1, 1, N'admin', N'SjBROTNkd2JEYW890', N'Muhammad', N'ahmed', NULL, N'223232323', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 1, 1, CAST(0x0000A3D5001673BA AS DateTime), 1, CAST(0x0000A3D5001673BA AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 1, 1, N'1', N'Nk9TUUs1bUdNR1U90', N'Safsd', N'sdfsd', NULL, N'1', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 0, 1, CAST(0x0000A3D5001798F5 AS DateTime), 1, CAST(0x0000A3D5001798F5 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 1, 1, N'2', N'Nk9TUUs1bUdNR1U90', N'2', N'2', NULL, N'2', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 0, 1, CAST(0x0000A3D5001A5278 AS DateTime), 1, CAST(0x0000A3D5001A5278 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 1, 1, N'3', N'Nk9TUUs1bUdNR1U90', N'3', N'3', NULL, N'3', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 0, 1, CAST(0x0000A3D5001BCDE9 AS DateTime), 1, CAST(0x0000A3D5001BCDE9 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 1, 1, N'4', N'Nk9TUUs1bUdNR1U90', N'4', N'4', N'4', N'4', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 1, 1, CAST(0x0000A3D5001C9281 AS DateTime), 1, CAST(0x0000A3D5001C9281 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 1, 1, N'sdfsdf', N'Nk9TUUs1bUdNR1U90', N'aaa', N'aaa', NULL, N'3424', NULL, NULL, NULL, CAST(0x0000A3D500000000 AS DateTime), CAST(0x0000A3D500000000 AS DateTime), 1, 10, CAST(0x0000A3D50111A141 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 1, 2, N'ahmed', N'SjBROTNkd2JEYW890', N'ahmed', N'khan', NULL, N'12121212', NULL, NULL, NULL, CAST(0x0000A3DA00000000 AS DateTime), CAST(0x0000A3DA00000000 AS DateTime), 1, 10, CAST(0x0000A3DA001E5791 AS DateTime), 17, CAST(0x0000A3DA00000000 AS DateTime))
INSERT [dbo].[User] ([Id], [CentreId], [RoleId], [UserName], [Password], [FirstName], [LastName], [CNIC], [Mobile], [Email], [Address], [City], [FromDate], [ToDate], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 1, 2, N'demo', N'SjBROTNkd2JEYW890', N'demo', N'demo', NULL, N'121212', NULL, NULL, NULL, CAST(0x0000A3DA00000000 AS DateTime), CAST(0x0000A3DA00000000 AS DateTime), 1, 10, CAST(0x0000A3DA013B5E20 AS DateTime), 10, CAST(0x0000A3DA013B5E20 AS DateTime))
SET IDENTITY_INSERT [dbo].[User] OFF
/****** Object:  Table [dbo].[UnionCouncil]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnionCouncil](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TownId] [int] NULL,
	[Name] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_UnionCouncil_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[UnionCouncil] ON
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, N'Ibraheem Hyderi Uc-01', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 1, N'Rehri Uc-02', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 1, N'Cattle Colony Uc-03', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 1, N'Quaidabad Uc-04', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 1, N'Landhi Uc-05', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 1, N'Gulshan-E-Hadeed Uc-06', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 1, N'Gaghar-07', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 2, N'Murad Memon Goth Uc-01', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 2, N'Darsano Chana Uc-02', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 2, N'Gadap Uc-03', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 2, N'Gujro Uc-04', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 2, N'Songal Uc-05', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 2, N'Maymarabad Uc-06', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 2, N'Yousuf Goth Uc-07', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 2, N'Mangopir Uc-08', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 3, N'Model Colony Uc-01', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 3, N'Kala Board Uc-02', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 3, N'Saudabad Uc-03', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, 3, N'Khokarapar Uc-04', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, 3, N'Jafar-E-Tayyar Uc-05', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, 3, N'Gharibabad Uc-06', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
INSERT [dbo].[UnionCouncil] ([Id], [TownId], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, 3, N'Ghazi Brohi Goth Uc-07', 1, 1, CAST(0x0000A38200D3100D AS DateTime), 1, CAST(0x0000A38200D3100D AS DateTime))
SET IDENTITY_INSERT [dbo].[UnionCouncil] OFF
/****** Object:  Table [dbo].[TrackingDevice]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TrackingDevice](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TrackingNo] [varchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_TrackingDevice] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[TrackingDevice] ON
INSERT [dbo].[TrackingDevice] ([Id], [TrackingNo], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'fsf3434weeq123', 1, 2, CAST(0x0000A3AD003EF176 AS DateTime), 2, CAST(0x0000A3D300000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[TrackingDevice] OFF
/****** Object:  Table [dbo].[Town]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Town](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Town] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Town] ON
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Bin Qaism Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Gadap Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Malir Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'Gulberg Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'Liaquatabad Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, N'North Karachi Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, N'North Nazimabad Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, N'Lyari Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, N'Saddar Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, N'Baldia Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, N'Kemari Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, N'Orangi Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, N'Site Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, N'Jamshed Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, N' Gulshan Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, N' Korangi Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, N' Landhi Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
INSERT [dbo].[Town] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, N' Shah Faisal Town', 1, 1, CAST(0x0000A38200D1AA19 AS DateTime), 1, CAST(0x0000A38200D1AA19 AS DateTime))
SET IDENTITY_INSERT [dbo].[Town] OFF
/****** Object:  Table [dbo].[TimeSlot]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeSlot](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](20) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_TimeSlot] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TimeSlot] ON
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'12:00 am', 1, 1, CAST(0x0000A3DC0025FF72 AS DateTime), 1, CAST(0x0000A3DC0025FF72 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'12:15 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'12:30 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'12:45 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'01:00 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, N'01:15 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, N'01:30 am', 1, 1, CAST(0x0000A3DC0025FF73 AS DateTime), 1, CAST(0x0000A3DC0025FF73 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, N'01:45 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, N'02:00 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, N'02:15 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, N'02:30 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, N'02:45 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, N'03:00 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, N'03:15 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, N'03:30 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, N'03:45 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, N'04:00 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, N'04:15 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, N'04:30 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, N'04:45 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, N'05:00 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, N'05:15 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (23, N'05:30 am', 1, 1, CAST(0x0000A3DC0025FF74 AS DateTime), 1, CAST(0x0000A3DC0025FF74 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (24, N'05:45 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (25, N'06:00 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (26, N'06:15 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (27, N'06:30 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (28, N'06:45 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (29, N'07:00 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (30, N'07:15 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (31, N'07:30 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (32, N'07:45 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (33, N'08:00 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (34, N'08:15 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (35, N'08:30 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (36, N'08:45 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (37, N'09:00 am', 1, 1, CAST(0x0000A3DC0025FF75 AS DateTime), 1, CAST(0x0000A3DC0025FF75 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (38, N'09:15 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (39, N'09:30 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (40, N'09:45 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (41, N'10:00 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (42, N'10:15 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (43, N'10:30 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (44, N'10:45 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (45, N'11:00 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (46, N'11:15 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (47, N'11:30 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (48, N'11:45 am', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (49, N'12:00 pm', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (50, N'12:15 pm', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (51, N'12:30 pm', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (52, N'12:45 pm', 1, 1, CAST(0x0000A3DC0025FF76 AS DateTime), 1, CAST(0x0000A3DC0025FF76 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (53, N'01:00 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (54, N'01:15 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (55, N'01:30 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (56, N'01:45 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (57, N'02:00 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (58, N'02:15 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (59, N'02:30 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (60, N'02:45 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (61, N'03:00 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (62, N'03:15 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (63, N'03:30 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (64, N'03:45 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (65, N'04:00 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (66, N'04:15 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (67, N'04:30 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (68, N'04:45 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (69, N'05:00 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (70, N'05:15 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (71, N'05:30 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (72, N'05:45 pm', 1, 1, CAST(0x0000A3DC0025FF77 AS DateTime), 1, CAST(0x0000A3DC0025FF77 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (73, N'06:00 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (74, N'06:15 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (75, N'06:30 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (76, N'06:45 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (77, N'07:00 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (78, N'07:15 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (79, N'07:30 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (80, N'07:45 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (81, N'08:00 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (82, N'08:15 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (83, N'08:30 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (84, N'08:45 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (85, N'09:00 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (86, N'09:15 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (87, N'09:30 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (88, N'09:45 pm', 1, 1, CAST(0x0000A3DC0025FF78 AS DateTime), 1, CAST(0x0000A3DC0025FF78 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (89, N'09:45 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (90, N'10:00 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (91, N'10:15 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (92, N'10:30 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (93, N'10:45 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (94, N'11:00 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (95, N'11:15 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (96, N'11:30 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
INSERT [dbo].[TimeSlot] ([Id], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (97, N'11:45 pm', 1, 1, CAST(0x0000A3DC0025FF79 AS DateTime), 1, CAST(0x0000A3DC0025FF79 AS DateTime))
SET IDENTITY_INSERT [dbo].[TimeSlot] OFF
/****** Object:  UserDefinedFunction [dbo].[fn_GetGender]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetGender](                
    @Id as int
    )        
RETURNS VARCHAR(500)        
AS        
begin
declare @result varchar(max)            

select @result = case when @Id=1 then 'Male'
	when @Id=2 then 'Female' 
	else null
	end
return @result 
end
GO
/****** Object:  Table [dbo].[Driver]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CentreId] [int] NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[CNIC] [nvarchar](13) NULL,
	[Mobile] [nvarchar](13) NULL,
	[Address] [nvarchar](200) NULL,
	[City] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Driver] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Driver] ON
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 1, N'Raees Ahmed ', N'Khan ', NULL, N'3152000662', NULL, NULL, 1, 1, CAST(0x0000A387018A5940 AS DateTime), 1, CAST(0x0000A387018A5940 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 1, N'Akhter ', N'Qureshi', N'424525252', N'3158186429', N'address', N'city', 1, 1, CAST(0x0000A387018A5941 AS DateTime), 3, CAST(0x0000A3A200000000 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 1, N'Muhammad ', N'Atique', NULL, N'3152000668', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, 1, N'Nizamuddin ', N'', NULL, N'3002411082', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 1, N'Abdullah', N'', NULL, N'3152000667', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 1, N'Nisar ', N'Ahmed ', NULL, N'3133840950', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 1, N'Bashir', N'', NULL, N'3462157852', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 1, N'Abdur ', N'Rauf ', NULL, N'3422288495', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 1, N'Bahar ', N'Zaman', NULL, N'3152000664', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 1, N'Karim ', N'Buksh', NULL, N'3213177197', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 1, N'Raza ', N'Khan ', NULL, N'3213450430', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 1, N'Syed Khalid ', N'Nazeer', NULL, N'3222257805', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 1, N'Shamsul ', N'Huda ', NULL, N'3142071058', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 1, N'Saeed Ahmed ', N'Khan ', NULL, N'3152000670', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 1, N'Ghulam ', N'Nabi', NULL, N'3212973509', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 1, N'Shareefullah', N'', NULL, N'3152000684', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 1, N'Sher ', N'Dil', NULL, N'3152000681', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 1, N'Inam ', N'Gul', NULL, N'3083523283', NULL, NULL, 1, 1, CAST(0x0000A387018A5941 AS DateTime), 1, CAST(0x0000A387018A5941 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, 1, N'sdfsf', N'sfs', N'5353', N'353', N'gsgssgsg', N'sgsg', 1, 3, CAST(0x0000A3A2002B2BD8 AS DateTime), 3, CAST(0x0000A3A2002B2BD8 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, 1, N'drivera', N'drivera', N'242342', N'23423423', N'234242', NULL, 1, 10, CAST(0x0000A3D50113D536 AS DateTime), 10, CAST(0x0000A3D50113D536 AS DateTime))
INSERT [dbo].[Driver] ([Id], [CentreId], [FirstName], [LastName], [CNIC], [Mobile], [Address], [City], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, 3, N'sdfsdf', N'sdfsdf', N'234324234234', N'234234234', N'sdfsdfsd', NULL, 1, 10, CAST(0x0000A3DA0152FEE9 AS DateTime), 10, CAST(0x0000A3DA00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Driver] OFF
/****** Object:  UserDefinedFunction [dbo].[fn_PaymentStatus]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_PaymentStatus](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = case when @Id= 1 then 'UnPaid'
when @Id= 2 then 'Paid'
when @Id= 3 then 'Refund'
end
--u.FirstName + ' ' + u.LastName  from [User] u where id = @Id
return @result   
end
GO
/****** Object:  Table [dbo].[CauseOfDeath]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CauseOfDeath](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_CauseOfDeath] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[CauseOfDeath] ON
INSERT [dbo].[CauseOfDeath] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Home', 1, 1, CAST(0x0000A38200CBA1ED AS DateTime), 1, CAST(0x0000A38200CBA1ED AS DateTime))
INSERT [dbo].[CauseOfDeath] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Hospital', 1, 1, CAST(0x0000A38200CBA1ED AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[CauseOfDeath] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Accident', 1, 1, CAST(0x0000A38200CBA1ED AS DateTime), 1, CAST(0x0000A38200CBA1ED AS DateTime))
INSERT [dbo].[CauseOfDeath] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'Murder', 1, 1, CAST(0x0000A38200CBA1ED AS DateTime), 1, CAST(0x0000A38200CBA1ED AS DateTime))
INSERT [dbo].[CauseOfDeath] ([Id], [Name], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'new1', 1, 2, CAST(0x0000A3AD0036E12F AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[CauseOfDeath] OFF
/****** Object:  Table [dbo].[BusVisit]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusVisit](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CentreId] [int] NOT NULL,
	[BusId] [int] NULL,
	[DriverId] [int] NULL,
	[VisitTypeId] [int] NOT NULL,
	[BookingId] [int] NULL,
	[InchargeName] [nvarchar](30) NULL,
	[VisitDate] [datetime] NULL,
	[OutTime] [tinyint] NULL,
	[ReturnTime] [tinyint] NULL,
	[ReadingWhenFilling] [bigint] NULL,
	[PumpLocation] [nvarchar](50) NULL,
	[FuelRate] [money] NULL,
	[FuelAmount] [money] NULL,
	[IsBookingCompleted] [bit] NULL,
	[InitialReading] [bigint] NULL,
	[FinalReading] [bigint] NULL,
	[Description] [nvarchar](300) NULL,
	[BusStatus] [tinyint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_BusVisit] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BusVisit] ON
INSERT [dbo].[BusVisit] ([Id], [CentreId], [BusId], [DriverId], [VisitTypeId], [BookingId], [InchargeName], [VisitDate], [OutTime], [ReturnTime], [ReadingWhenFilling], [PumpLocation], [FuelRate], [FuelAmount], [IsBookingCompleted], [InitialReading], [FinalReading], [Description], [BusStatus], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (182, 1, 2, 3, 2, 123, NULL, CAST(0x0000A3F900000000 AS DateTime), 5, 15, 0, NULL, 0.0000, 0.0000, 1, 1000, 1025, NULL, 3, 1, 0, CAST(0x0000A3F900F82D76 AS DateTime), 10, CAST(0x0000A3FA00000000 AS DateTime))
INSERT [dbo].[BusVisit] ([Id], [CentreId], [BusId], [DriverId], [VisitTypeId], [BookingId], [InchargeName], [VisitDate], [OutTime], [ReturnTime], [ReadingWhenFilling], [PumpLocation], [FuelRate], [FuelAmount], [IsBookingCompleted], [InitialReading], [FinalReading], [Description], [BusStatus], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (183, 1, 1, 1, 1, 0, N'i name', CAST(0x0000A3F900000000 AS DateTime), 1, 3, 0, N'tariq rd', 85.0000, 1000.0000, 0, 1025, 1030, NULL, 3, 1, 10, CAST(0x0000A3F900FA9E48 AS DateTime), 10, CAST(0x0000A3F900000000 AS DateTime))
INSERT [dbo].[BusVisit] ([Id], [CentreId], [BusId], [DriverId], [VisitTypeId], [BookingId], [InchargeName], [VisitDate], [OutTime], [ReturnTime], [ReadingWhenFilling], [PumpLocation], [FuelRate], [FuelAmount], [IsBookingCompleted], [InitialReading], [FinalReading], [Description], [BusStatus], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (184, 1, 2, 1, 1, 0, N'iname', CAST(0x0000A3F900000000 AS DateTime), 1, 3, 0, N'abc', 85.0000, 1000.0000, 0, 1025, 1030, NULL, 3, 1, 10, CAST(0x0000A3F900FAE800 AS DateTime), 10, CAST(0x0000A3F900000000 AS DateTime))
INSERT [dbo].[BusVisit] ([Id], [CentreId], [BusId], [DriverId], [VisitTypeId], [BookingId], [InchargeName], [VisitDate], [OutTime], [ReturnTime], [ReadingWhenFilling], [PumpLocation], [FuelRate], [FuelAmount], [IsBookingCompleted], [InitialReading], [FinalReading], [Description], [BusStatus], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (185, 1, 3, 10, 2, 124, NULL, CAST(0x0000A3F900000000 AS DateTime), 17, 28, 0, NULL, 0.0000, 0.0000, 0, 0, 0, NULL, 3, 1, 10, CAST(0x0000A3F900FD9746 AS DateTime), 0, CAST(0x0000A3F900000000 AS DateTime))
INSERT [dbo].[BusVisit] ([Id], [CentreId], [BusId], [DriverId], [VisitTypeId], [BookingId], [InchargeName], [VisitDate], [OutTime], [ReturnTime], [ReadingWhenFilling], [PumpLocation], [FuelRate], [FuelAmount], [IsBookingCompleted], [InitialReading], [FinalReading], [Description], [BusStatus], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (186, 7, 2, 1, 2, 125, NULL, CAST(0x0000A3F400000000 AS DateTime), 6, 17, 0, NULL, 0.0000, 0.0000, 1, 0, 0, NULL, 3, 1, 10, CAST(0x0000A3F9010628E2 AS DateTime), 0, CAST(0x0000A3F900000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[BusVisit] OFF
/****** Object:  Table [dbo].[Bus]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Bus](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CentreId] [int] NULL,
	[TrackingDeviceId] [varchar](50) NULL,
	[VehicleNo] [varchar](50) NOT NULL,
	[No] [varchar](10) NULL,
	[ModelNo] [varchar](50) NULL,
	[InitialReading] [bigint] NULL,
	[Description] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Bus] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Bus] ON
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, 2, N'23332', N'233223', N'23323', N'2008', 1000, N'sdfsdfs', 1, 3, CAST(0x0000A39E0179D382 AS DateTime), 2, CAST(0x0000A3D300000000 AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, 10, NULL, N'EC-3601', N'1/A', N'1984', 1000, NULL, 1, 1, CAST(0x0000A39F018904CB AS DateTime), 1, CAST(0x0000A39F018904CB AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, 2, NULL, N'EC-2502', N'2/A', N'1976', 1000, NULL, 1, 1, CAST(0x0000A39F018904CB AS DateTime), 1, CAST(0x0000A39F018904CB AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, NULL, NULL, N'EC-2501', N'3/A', N'1985', 1000, NULL, 1, 1, CAST(0x0000A39F018904CB AS DateTime), 1, CAST(0x0000A39F018904CB AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, 5, NULL, N'EC-3602', N'5/A', N'1980', 1000, NULL, 1, 1, CAST(0x0000A39F018904CB AS DateTime), 1, CAST(0x0000A39F018904CB AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, 5, NULL, N'EC-0224', N'14', N'1979', 1000, NULL, 1, 1, CAST(0x0000A39F018904CB AS DateTime), 1, CAST(0x0000A39F018904CB AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, 9, NULL, N'EC-0127', N'10', N'1978', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, 1, NULL, N'EC-0128', N'11', N'1984', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, 1, NULL, N'EC-1801', N'17', N'1986', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, 7, NULL, N'EC-0041', N'12', N'1978', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, 6, NULL, N'EC-0071', N'13', N'1976', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, 3, NULL, N'EC-0225', N'15', N'1976', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, 13, NULL, N'EC-1802', N'16', N'1984', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, 14, NULL, N'EC-3740', N'18', N'1986', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, 25, NULL, N'EC-3741', N'19', N'1981', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, 7, NULL, N'EB-9020', N'', N'', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, 10, NULL, N'EB-9021', N'', N'', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, 26, NULL, N'EB-9022', N'', N'', 1000, NULL, 1, 1, CAST(0x0000A39F018904CC AS DateTime), 1, CAST(0x0000A39F018904CC AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, 1, NULL, N'busa', NULL, N'2014', NULL, NULL, 1, 10, CAST(0x0000A3D501131DD7 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, 7, NULL, N'v-01', N'v-01', N'2010', NULL, N'Clifton Centre Bus', 1, 10, CAST(0x0000A3D600022E2C AS DateTime), 10, CAST(0x0000A3D600000000 AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, 7, NULL, N'V-02', NULL, N'2010', NULL, N'Test Vehicle', 1, 10, CAST(0x0000A3D70113287C AS DateTime), 10, CAST(0x0000A3D700000000 AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, 1, NULL, N'VH-03', N'VH-03', N'2010', 1000, N'some desc', 1, 10, CAST(0x0000A3DA0022D1EE AS DateTime), 10, CAST(0x0000A3DA00000000 AS DateTime))
INSERT [dbo].[Bus] ([Id], [CentreId], [TrackingDeviceId], [VehicleNo], [No], [ModelNo], [InitialReading], [Description], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (23, 1, NULL, N'VH-04', N'VH-04', N'2010', 1000, N'testing..', 1, 10, CAST(0x0000A3DA002497B0 AS DateTime), 10, CAST(0x0000A3DA00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Bus] OFF
/****** Object:  Table [dbo].[Booking]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Booking](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ContactName] [nvarchar](50) NULL,
	[ContactMobile] [nvarchar](50) NULL,
	[ContactNic] [nvarchar](50) NULL,
	[DeseasedName] [nvarchar](50) NULL,
	[DeseasedAge] [smallint] NULL,
	[DeseasedGender] [smallint] NULL,
	[CauseOfDeath] [smallint] NULL,
	[Address] [varchar](50) NULL,
	[BusPoint] [int] NULL,
	[LandmarkId] [int] NULL,
	[UnionCouncilId] [int] NULL,
	[TownId] [int] NULL,
	[PickupDate] [datetime] NULL,
	[PickupTime] [smallint] NULL,
	[ReturnTime] [smallint] NULL,
	[GraveyardId] [smallint] NULL,
	[NamazEJanazaHeldIn] [smallint] NULL,
	[NamazEJanazaLocation] [nvarchar](50) NULL,
	[MasjidName] [nvarchar](50) NULL,
	[OtherDetail] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_Booking1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Booking] ON
INSERT [dbo].[Booking] ([Id], [ContactName], [ContactMobile], [ContactNic], [DeseasedName], [DeseasedAge], [DeseasedGender], [CauseOfDeath], [Address], [BusPoint], [LandmarkId], [UnionCouncilId], [TownId], [PickupDate], [PickupTime], [ReturnTime], [GraveyardId], [NamazEJanazaHeldIn], [NamazEJanazaLocation], [MasjidName], [OtherDetail], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (123, N'b1', N'111222333', N'12121212', N'dnamae', 20, 1, 1, N'addres info', 3, 0, 3, 3, CAST(0x0000A3F900000000 AS DateTime), 5, 15, 1, 3, N'tariq road', N'madina masjid', N'other commetns', 1, 10, CAST(0x0000A3F900F638AE AS DateTime), 10, CAST(0x0000A3FA00000000 AS DateTime))
INSERT [dbo].[Booking] ([Id], [ContactName], [ContactMobile], [ContactNic], [DeseasedName], [DeseasedAge], [DeseasedGender], [CauseOfDeath], [Address], [BusPoint], [LandmarkId], [UnionCouncilId], [TownId], [PickupDate], [PickupTime], [ReturnTime], [GraveyardId], [NamazEJanazaHeldIn], [NamazEJanazaLocation], [MasjidName], [OtherDetail], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (124, N'b2', N'1123123', N'12313', N'dname', 22, 1, 4, N'some add', 1, 0, 1, 1, CAST(0x0000A3F900000000 AS DateTime), 17, 28, 2, 4, N'f locaiton', N'masjis name', N'ddd', 1, 10, CAST(0x0000A3F900FD75D5 AS DateTime), 10, CAST(0x0000A3F900000000 AS DateTime))
INSERT [dbo].[Booking] ([Id], [ContactName], [ContactMobile], [ContactNic], [DeseasedName], [DeseasedAge], [DeseasedGender], [CauseOfDeath], [Address], [BusPoint], [LandmarkId], [UnionCouncilId], [TownId], [PickupDate], [PickupTime], [ReturnTime], [GraveyardId], [NamazEJanazaHeldIn], [NamazEJanazaLocation], [MasjidName], [OtherDetail], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (125, N'b31', N'11111', N'1111', N'11', 11, 1, 3, N'111', 4, 0, 4, 4, CAST(0x0000A3F400000000 AS DateTime), 6, 17, 2, 4, N'111', N'111', N'111', 1, 10, CAST(0x0000A3F90105AFD8 AS DateTime), 10, CAST(0x0000A3FA00000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[Booking] OFF
/****** Object:  Table [dbo].[AlkhidmatCentreDetail]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[AlkhidmatCentreDetail](
	[Id] [int] NULL,
	[CentreId] [int] NULL,
	[InchargeName] [varchar](50) NULL,
	[ContactNo] [varchar](15) NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[AlkhidmatCentre]    Script Date: 12/07/2014 17:56:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[AlkhidmatCentre](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[LandmarkId] [int] NULL,
	[Address] [varchar](500) NULL,
	[ContactNo1] [varchar](15) NULL,
	[ContactNo2] [varchar](15) NULL,
	[IsCoPartner] [bit] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
	[ModifiedBy] [int] NOT NULL,
	[ModifiedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_AlkhidmatCentre] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[AlkhidmatCentre] ON
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (1, N'Liaqatabad', 1, N'Mian Road, Liaqatabad, Bus Stop-2', N'34910968', N'38258668       ', 0, 1, 1, CAST(0x0000A387017DB25C AS DateTime), 2, CAST(0x0000A3AD00000000 AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (2, N'Bin Qasim', 1, N'Civic Centre, Korangi -5', N'35042515', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (3, N'Malir ', 1, N'Saudabad, Adjacent Hanifia Mosque', N'34404464', N'3152000669     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (4, N'Moosa Lane', 1, N'Near Pathan Mosque, Moosa Lane', N'32512555', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (5, N'North Karachi ', 1, N'Power House Round about, adjacent Masjid-e-AlHuda', N'36984387', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (6, N'Orangi Town', 1, N'Orangi Pone Panch No, Adjacent to Al-Khidmat Hospital', N'36660028', N'3152000676     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (7, N'Clifton ', 1, N'National Square, Punjab Chowrangi, Clifton', N'35373801', N'3152000680     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (8, N'Sharfabad', 1, N'Near Jame Mosque Sharfabad', N'34924598', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (9, N'Gulshan-e-Iqbal', 1, N'Gulshan-e-Iqbal, Block-13, Near Baitul Mukarram Mosque', N'34990203', N'3152000682     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (10, N'Adamjee Nagar', 1, N'Madina Market, Adjacent Makka Masjid, Kathiawar Housing Society', N'34538172', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (11, N'North Nazimabad', 1, N'North Nazimabad, Block-A, Adjacent to Jame Mosque Al-Falah', N'36625046', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (12, N'Landhi 89', 1, N'Muhammad Nagar, Landhi 89, Near Jame Mosque Hanifia', N'', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (13, N'Masjid -e Rizwan', 1, N'Block-14, F.B.Area, Opposite Heart Hospital', N'36310724', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (14, N'Baldia Town', 1, N'Madina Colony, Iqbal Road, Baldia Town', N'38258868', N'3152000685     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (15, N'Gulistan-e-Jauhar ', 1, N'PIA Housing Society, Adjacent to Omer Farooq Mosque, Pehalwan Goth', N'34018892', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (16, N'Masjid-e-Ghausia', 1, N'Dastagir Society, Block-9, F.B.Area, ', N'', N'32068893       ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (17, N'Masjid -e-Farooq-e-Azam', 1, N'Block-7, F.B.Area, Karachi', N'', N'32068891       ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (18, N'Gulshan-e-Hadeed', 1, N'Adjacent Jame Mosque Quba, Gulshan-e-Hadid, Phase-1', N'34710472', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (19, N'Akhter Colony', 1, N'Jamat-e-Islami Office, Sector-C, Lane -12, Akhter Colony', N'', N'3412924445     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (20, N'Lasbella', 1, N'Zone Office, Jamshed Town, Opposite Noman Mosque, Nishter Road,Lasbela ', N'', N'3333751796     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (21, N'Baitul Mukarram', 1, N'Saleem Centre, Main University Road, Near Baitual Mukarram Mosque, Gulshan', N'34813285', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (22, N'Masjid-e-Noman', 1, N'Block-16, F.B.Area, Adjacent to Masjid -e-Noman', N'36375300', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (23, N'Shah Faisal Colony', 1, N'Plot-ST-13/A, Block-1, Shah Faisal Colony', N'8269222', N'               ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (24, N'Gulshan-e-Maymar', 1, N'Huzaifa Mosque, Sector Z-4, Gulshan-e-Maymar', N'', N'3312663579     ', 0, 1, 1, CAST(0x0000A387017DB25D AS DateTime), 1, CAST(0x0000A387017DB25D AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (25, N'Head Office ', 1, N'Idara-e-Noor-e-Haq, New M.A.Jinnah Road, Opposite Islamia College', N'34915705', N'3152000661     ', 0, 1, 1, CAST(0x0000A387017DB25E AS DateTime), 1, CAST(0x0000A387017DB25E AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (26, N'Shah Latif Town', 1, N'Jame Mosque Sulaiman, Sector-17, Shah Latif Town, Bhains Colony', N'', N'3337373611     ', 0, 1, 1, CAST(0x0000A387017DB25E AS DateTime), 1, CAST(0x0000A387017DB25E AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (27, N'aad', 7, N'aad', N'aad', N'aad', 1, 1, 3, CAST(0x0000A39100F951AB AS DateTime), 3, CAST(0x0000A39400000000 AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (28, N'aab', 8, N'aab', N'aab', N'aab', 0, 1, 3, CAST(0x0000A394016DB01E AS DateTime), 3, CAST(0x0000A39400000000 AS DateTime))
INSERT [dbo].[AlkhidmatCentre] ([Id], [Name], [LandmarkId], [Address], [ContactNo1], [ContactNo2], [IsCoPartner], [IsActive], [CreatedBy], [CreatedDate], [ModifiedBy], [ModifiedDate]) VALUES (29, N'aa', 1, N'aa', N'aa', NULL, 0, 1, 10, CAST(0x0000A3D50111B7E4 AS DateTime), 10, CAST(0x0000A3D500000000 AS DateTime))
SET IDENTITY_INSERT [dbo].[AlkhidmatCentre] OFF
/****** Object:  View [dbo].[AdminSummary_View]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE view [dbo].[AdminSummary_View]
as
select d.FirstName + ' ' + d.LastName as driver,c.Name as centre,b.VehicleNo,BookingId,VisitDate,
CONVERT(varchar, DATEDIFF(MI,CONVERT(varchar(8),bv.visitDate,1) + ' ' + ts1.description,CONVERT(varchar(8),bv.visitDate,1) + ' ' + ts2.description)/60) + ':' + CONVERT(varchar, DATEDIFF(MI,CONVERT(varchar(8),bv.visitDate,1) + ' ' + ts1.description,CONVERT(varchar(8),bv.visitDate,1) + ' ' + ts2.description)%60) as visitInterval,
ts1.description as outTime,ts2.description as returnTime
,(bv.FinalReading - bv.InitialReading) as milage,
bv.InchargeName,bv.FuelAmount,bv.FuelRate,bv.PumpLocation,bv.VisitTypeId
,bv.DriverId,bv.BusId, bv.CentreId,bv.Id as busVisitId
from BusVisit bv inner join timeslot ts1 on bv.OutTime=ts1.id
inner join timeslot ts2 on bv.ReturnTime=ts2.id
inner join Driver d on d.Id=bv.DriverId
inner join Bus b on b.Id=bv.BusId
inner join AlkhidmatCentre c on c.Id=bv.CentreId
GO
/****** Object:  StoredProcedure [dbo].[GetBookingById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBookingById]
@Id int
AS
select * from Booking where id=@id
GO
/****** Object:  StoredProcedure [dbo].[GetBookingByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBookingByCriteria]        
@ContactInfo varchar(200)=null,        
@DeseasedInfo varchar(200)=null,        
@GenderId smallint=0,        
@PaymentStatusId smallint=-1,        
--@BookingDate datetime,        
@GreveyardId smallint=0,        
@CentreId smallint=0,        
@BusId smallint=0        
as        
begin        
        
select b.*,bv.BusId,bv.CentreId,p.PaymentStatus as status from Booking b       
left join Payment p on p.BookingId=b.Id      
left join BusVisit bv on bv.BookingId=b.Id      
where 1=1      
 -- and ( case when isnull(@ContactInfo,'')<>'' then (b.ContactName like @ContactInfo or b.ContactMobile like @ContactInfo or b.ContactNic like @ContactInfo) end)      
--and case when ISNULL(@DeseasedInfo,'')<>'' then (b.DeseasedName like @DeseasedInfo or b.Address like @DeseasedInfo) end      
and ISNULL(b.ContactName,'%%') like case when ISNULL(@ContactInfo,'')<>'' then @ContactInfo else b.ContactName end      
and isnull(b.DeseasedName,'%%') like case when ISNULL(@DeseasedInfo,'')<>'' then @DeseasedInfo else b.DeseasedName end      
and b.GraveyardId =  case when @GreveyardId<>0 then @GreveyardId ELSE b.GraveyardId end      
and p.PaymentStatus = case when @PaymentStatusId<>-1 then @PaymentStatusId else p.PaymentStatus end      
and b.DeseasedGender= case when @GenderId<>0 then @GenderId else  b.DeseasedGender end      
--and bv.CentreId= case when ISNULL(@CentreId,0)<>0 then @CentreId else bv.CentreId end      
--and p.PaymentLocation = case when ISNULL(@CentreId,'')<>'' then @CentreId else p.PaymentLocation end      
and bv.BusId= case when ISNULL(@BusId,0)<>0 then @BusId else bv.BusId end      
      
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllVisitType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllVisitType]
@IsActive bit =1
as
begin
select * from [VisitType]  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllUser]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAllUser]  
@IsActive bit =  1  
as  
begin  
select u.*,  ac.Name as CenterDesc, r.Name as RoleDesc   
from [User] u   
inner join AlkhidmatCentre ac on u.CentreId =  ac.Id  
inner join [Role] r on u.RoleId =  r.Id   
--where u.IsActive =  @IsActive  
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllUnionCouncil]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllUnionCouncil]
@IsActive bit
as
begin
select u.*, t.Name TownDesc from [UnionCouncil] u 
inner join Town t on u.TownId =  t.Id 
where u.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllTrackingDevice]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllTrackingDevice]
@IsActive bit =1
as
begin
select * from [TrackingDevice]  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllTown]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetAllTown]
@IsActive bit
as
begin
select * from [Town]  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllRole]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetAllRole]
@IsActive bit
as
begin
select * from [Role]  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllRefundType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllRefundType] 
@IsActive bit =1
as
begin
select * from [RefundType]  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllRefundBooking]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetAllRefundBooking]
@IsActive bit =  1
as
begin
select * from [RefundBooking] r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllPaymentType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllPaymentType]
@IsActive bit =1
as
begin
select * from PaymentType  r where r.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllLandmark]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllLandmark]
@IsActive bit =  1
as
begin
select l.*, u.Name UcDesc from [Landmark] l 
inner join UnionCouncil u  on l.UcId =  u.Id
where l.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllGraveyard]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllGraveyard] 
@IsActive bit =1
as
begin
select g.* ,  l.Name LandmarkDesc from [Graveyard] g 
inner join Landmark l on g.LandmarkId =  l.Id 
where g.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllDriver]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllDriver]
	@IsActive bit =  1
	as
	begin
	select d.* ,  c.Name CentreDesc from [Driver] d
	inner join AlkhidmatCentre c on c.id=d.centreid 
	where d.IsActive =  @IsActive
	end
GO
/****** Object:  StoredProcedure [dbo].[GetAllCentre]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetAllCentre]
	@IsActive bit =  1
	as
	begin
	select * from [AlkhidmatCentre]	c where c.IsActive =  @IsActive
	end
GO
/****** Object:  StoredProcedure [dbo].[GetAllCauseofDeath]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetAllCauseofDeath]
@IsActive bit =1
as
begin
select * from [CauseOfDeath] c where c.IsActive =  @IsActive
end
GO
/****** Object:  StoredProcedure [dbo].[GetAllBusVisit]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAllBusVisit]
@Id int
as  
select bv.*,t.Name as VisitType ,b.VehicleNo as BusDesc,(d.FirstName + ' ' + d.LastName) as DriverDesc,a.Name as CentreDesc   
from BusVisit bv 
inner join Bus b on b.Id=bv.BusId
inner join Driver d on d.Id=bv.DriverId
inner join AlkhidmatCentre a on a.Id=bv.CentreId
left join VisitType t on t.Id=bv.VisitTypeId
where bv.IsActive=1 and bv.busId=@Id
GO
/****** Object:  StoredProcedure [dbo].[GetAllBus]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAllBus]  
 @IsActive bit =  1  
 as  
 begin  
 select b.*,c.name as CentreDesc from [Bus] b 
 inner join AlkhidmatCentre c on c.id=b.centreid
 where b.IsActive =  @IsActive 
 order by  CentreDesc 
 
 end
GO
/****** Object:  StoredProcedure [dbo].[GetAllBooking]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAllBooking]    
@Id int    
as    
select b.* from Booking b    
inner join Payment p on b.Id =  p.BookingId    
where isnull(p.PaymentStatus,0) =    
case 
when @Id = 2 then 1     
when @Id = 3 then 0    
else isnull(p.PaymentStatus,0)   
end    
and LEFT(CONVERT(VARCHAR, b.PickupDate, 120), 10) =  case 
when @Id = 4 then   LEFT(CONVERT(VARCHAR, GETDATE(), 120), 10) else  LEFT(CONVERT(VARCHAR, b.PickupDate, 120), 10) end
GO
/****** Object:  StoredProcedure [dbo].[GetAdminBusMilageReport]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAdminBusMilageReport]       
 @FromVisitDate datetime,      
 @ToVisitDate datetime      
AS      
BEGIN      
     
 select ac.Name CentreDesc,bb.Id BusId, bb.VehicleNo , sum(bv.FinalReading -  bv.InitialReading) TotalMilage, count(bv.Id) TotalVisits      
from Bus bb       
inner join BusVisit bv on bb.Id =  bv.BusId       
inner join AlkhidmatCentre ac on bv.CentreId =  ac.Id      
left join  Booking b on b.Id = bv.BookingId       
where DATEDIFF(day,bv.VisitDate, @FromVisitDate) <= 0 and DATEDIFF(DAY, @ToVisitDate ,  bv.VisitDate) <= 0      
group by ac.Name, bb.Id, bb.VehicleNo  
order by ac.Name      
END
GO
/****** Object:  StoredProcedure [dbo].[GetAdminBookingReport]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAdminBookingReport]
 @FromBookingDate datetime,
 @ToBookingDate datetime
AS
BEGIN
 --Paid AMount


select a.Centre as Alkhidmatentre , isnull(a.UnpaidAmount, 0) UnpaidAmount, isnull(a.PaidAmount,0) PaidAmount,
isnull(b.[PaidBooking],0) PaidBooking , ISNULL(b.[UnpaidBooking],0)UnpaidBooking from
(
select * from 
(select ac.Name Centre ,  isnull(p.Amount,0) + isnull(p.ExtraAmountCharge,0) As Amount , -- b.id   BookingId,
case when isnull(p.PaymentStatus, 0) =0  then 'UnpaidAmount'
     else 'PaidAmount' end PaymentStatus
from Booking b
inner join Payment p on b.Id =  p.BookingId 
left join AlkhidmatCentre ac on p.PaymentLocation =  ac.Id
where DATEDIFF(day,b.PickupDate, @FromBookingDate) <= 0 and DATEDIFF(DAY, @ToBookingDate ,  b.PickupDate) <= 0  
) query
PIVOT(
   SUM(Amount)
      FOR PaymentStatus 
      IN ([UnpaidAmount],[PaidAmount])     
      ) AS PVTTable
) a  
  inner join  
 -- Paid / unpaid Booking  
(
select *  from 
(select ac.Name Centre  ,  b.id   BookingId,
case when isnull(p.PaymentStatus, 0) =0  then 'UnpaidBooking'
     else 'PaidBooking' end PaymentStatus
from Booking b
inner join Payment p on b.Id =  p.BookingId 
left join AlkhidmatCentre ac on p.PaymentLocation =  ac.Id
where DATEDIFF(day,b.PickupDate, @FromBookingDate) <= 0 and DATEDIFF(DAY, @ToBookingDate ,  b.PickupDate) <= 0   
) query
PIVOT(
   count(BookingId)
      FOR PaymentStatus 
      IN ([UnpaidBooking],[PaidBooking])     
      ) AS PVTTable 
   )b
   on a.centre=b.Centre
   
END
GO
/****** Object:  UserDefinedFunction [dbo].[fn_RefundType]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_RefundType](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name  from RefundType u where id = @Id

--u.FirstName + ' ' + u.LastName  from [User] u where id = @Id

--case when @Id= 1 then 'UnPaid'
--when @Id= 2 then 'Paid'
--when @Id= 3 then 'Refund'
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetUnionCouncil]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetUnionCouncil](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name from UnionCouncil  where id =  @Id
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetTown]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetTown](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name from Town where id =  @Id
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetTimeSlot]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetTimeSlot](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Description from TimeSlot where id =  @Id
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetRefundType]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetRefundType](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name  from RefundType u where id = @Id

--u.FirstName + ' ' + u.LastName  from [User] u where id = @Id

--case when @Id= 1 then 'UnPaid'
--when @Id= 2 then 'Paid'
--when @Id= 3 then 'Refund'
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetPaymantType]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetPaymantType](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name  from PaymentType where id = @Id
return @result   
end
GO
/****** Object:  StoredProcedure [dbo].[DelBusVisitById]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DelBusVisitById]
@Id int
as
delete from BusVisit where id=@Id
GO
/****** Object:  StoredProcedure [dbo].[ChangeUserPassword]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[ChangeUserPassword]
@UserName nvarchar(50),
@Password nvarchar(50) ,
@ResetPassword nvarchar(50)
	
AS
BEGIN
	
	if EXISTS  (select id from [User]  where username = @username and [password] = @Password)
	begin	
         update [user] set [Password] =  @ResetPassword where username = @username
	end
	else
	begin
		RAISERROR ('You have entered your wrong current Paasword. Please enter correct current password to reset.', -- Message text.  
         16, -- Severity.  
         1 -- State.   
         );  
	end
	 
END
GO
/****** Object:  View [dbo].[CCTracking_View]    Script Date: 12/07/2014 17:56:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[CCTracking_View]
AS
SELECT     b.Id AS BookingId, b.ContactName, b.ContactMobile, b.ContactNic, b.DeseasedName, b.DeseasedAge, b.DeseasedGender, b.Address AS BookingAddress, 
                      b.BusPoint AS BusPointId, bp.Name AS BusPoint, b.CauseOfDeath AS CauseOfDeathId, cod.Name AS CauseOfDeath, b.LandmarkId, l.Name AS LandMark, b.TownId, 
                      t.Name AS BookingTown, b.GraveyardId, g.Name AS Graveyard, b.PickupDate, b.PickupTime, b.ReturnTime, b.NamazEJanazaHeldIn, b.NamazEJanazaLocation, 
                      b.MasjidName, b.OtherDetail, b.IsActive AS BookingActive, p.Pricing, p.Amount, p.PaymentType AS PaymentTypeId, pt.Name AS PaymentType, p.PaymentStatus, 
                      ac.Name AS BookingCentre, ac.Address AS BookingCentreAddress, ac.ContactNo1 AS BookingCenterContactNo1, ac.ContactNo2 AS BookingCentreContactNo2, 
                      p.OfficerId AS PaymentOfficer, u.FirstName + ' ' + u.LastName AS PaymentOfficerName, u.Address AS PaymentOfficerAddress, u.CNIC AS PaymentOfficerCnic, 
                      u.CentreId AS PaymentOfficerCentreId, ac2.Name AS PaymentOfficerCentre, p.ReceiptNo, p.ExtraAmountCharge, p.ExtraAmountReason, p.ExtraAmountReceipt, 
                      p.EasyPaisaTranNo, b.CreatedBy AS BookingUser, u2.FirstName + ' ' + u2.LastName AS BookingCreatedBy, b.CreatedDate AS BookingCreatedDate
FROM         dbo.Booking AS b LEFT OUTER JOIN
                      dbo.CauseOfDeath AS cod ON b.CauseOfDeath = cod.Id LEFT OUTER JOIN
                      dbo.Landmark AS bp ON b.BusPoint = bp.Id LEFT OUTER JOIN
                      dbo.Landmark AS l ON b.LandmarkId = l.Id LEFT OUTER JOIN
                      dbo.Town AS t ON b.TownId = t.Id LEFT OUTER JOIN
                      dbo.Graveyard AS g ON b.GraveyardId = g.Id LEFT OUTER JOIN
                      dbo.Payment AS p ON b.Id = p.BookingId LEFT OUTER JOIN
                      dbo.PaymentType AS pt ON p.PaymentType = pt.Id LEFT OUTER JOIN
                      dbo.AlkhidmatCentre AS ac ON p.PaymentLocation = ac.Id LEFT OUTER JOIN
                      dbo.[User] AS u ON p.OfficerId = u.Id LEFT OUTER JOIN
                      dbo.AlkhidmatCentre AS ac2 ON u.CentreId = ac2.Id LEFT OUTER JOIN
                      dbo.[User] AS u2 ON b.CreatedBy = u2.Id
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "b"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 125
               Right = 239
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "cod"
            Begin Extent = 
               Top = 6
               Left = 277
               Bottom = 125
               Right = 437
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "bp"
            Begin Extent = 
               Top = 6
               Left = 475
               Bottom = 125
               Right = 635
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "l"
            Begin Extent = 
               Top = 6
               Left = 673
               Bottom = 125
               Right = 833
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "t"
            Begin Extent = 
               Top = 126
               Left = 38
               Bottom = 245
               Right = 198
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "g"
            Begin Extent = 
               Top = 126
               Left = 236
               Bottom = 245
               Right = 396
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "p"
            Begin Extent = 
               Top = 126
               Left = 434
               Bottom = 245
               Right = 622
            End
            DisplayFlags = 280
            TopColumn = 0
         End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CCTracking_View'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'         Begin Table = "pt"
            Begin Extent = 
               Top = 126
               Left = 660
               Bottom = 245
               Right = 820
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ac"
            Begin Extent = 
               Top = 246
               Left = 38
               Bottom = 365
               Right = 198
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "u"
            Begin Extent = 
               Top = 246
               Left = 236
               Bottom = 365
               Right = 396
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "ac2"
            Begin Extent = 
               Top = 246
               Left = 434
               Bottom = 365
               Right = 594
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "u2"
            Begin Extent = 
               Top = 246
               Left = 632
               Bottom = 365
               Right = 792
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CCTracking_View'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'CCTracking_View'
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetCauseOfDeath]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetCauseOfDeath](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = cd.Name from CauseOfDeath cd where id =  @Id
return @result   
end
GO

/****** Object:  StoredProcedure [dbo].[SaveVisitType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SaveVisitType] 

@Id	int,
@Name	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [VisitType]
	set 
	[Name] =  @Name, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [VisitType] where Id = @Id
	end	
	else
	begin
	insert into [VisitType]
	(Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [VisitType] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveUser]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveUser]  
  @Id int,  
 @CentreId int,  
 @RoleId int,  
 @UserName nvarchar(50),  
 @Password nvarchar(100) = null,  
 @FirstName nvarchar(50),  
 @LastName nvarchar(50),  
 @CNIC nvarchar(13)=null,  
 @Mobile nvarchar(13)=null,  
 @Email nvarchar(100)= null,  
 @Address nvarchar(200)=null,  
 @City nvarchar(50)=null,  
 @FromDate datetime =  null,  
 @ToDate datetime =  null,  
 @IsActive bit,  
 @CreatedBy int,  
 @ModifiedBy int ,  
 @ModifiedDate Datetime  
 AS  
 BEGIN  
    
  if @Id is not null and @Id > 0  
  begin  
   update [user]  
   set   
   CentreId = @CentreId,RoleId=@RoleId,FirstName = @FirstName,LastName = @LastName,CNIC = @CNIC,Mobile = @Mobile,Email = @Email,[Address] = @Address,City = @City,FromDate = @FromDate,ToDate = @ToDate,IsActive = @IsActive,ModifiedBy = @ModifiedBy ,  ModifiedDate = @ModifiedDate  
   where Id = @Id  
    
   select u.*,  ac.Name as CenterDesc, r.Name as RoleDesc   
   from [User] u   
   inner join AlkhidmatCentre ac on u.CentreId =  ac.Id  
   inner join [Role] r on u.RoleId =  r.Id  where u.id=@Id   
  end   
  else  
   begin   
    begin try  
      
    insert into [user]  
    (CentreId,RoleId,UserName,[Password],FirstName,LastName,CNIC,Mobile,Email,[Address],City,FromDate,ToDate,IsActive,CreatedBy,ModifiedBy)  
    values   
    (@CentreId,@RoleId,@UserName,@Password,@FirstName,@LastName,@CNIC,@Mobile,@Email,@Address,@City,@FromDate,@ToDate,@IsActive,@CreatedBy,@ModifiedBy)  
      
    select @Id = SCOPE_IDENTITY()  
      
    select u.*,  ac.Name as CenterDesc, r.Name as RoleDesc   
    from [User] u   
    inner join AlkhidmatCentre ac on u.CentreId =  ac.Id  
    inner join [Role] r on u.RoleId =  r.Id  where u.Id =  @Id  
      
    end try  
    begin catch  
      
    DECLARE @ErrorMessage NVARCHAR(4000);  
    DECLARE @ErrorSeverity INT;  
    DECLARE @ErrorState INT;  
  
    SELECT   
     @ErrorMessage = ERROR_MESSAGE(),  
     @ErrorSeverity = ERROR_SEVERITY(),  
     @ErrorState = ERROR_STATE();  
          
    -- Use RAISERROR inside the CATCH block to return error  
    -- information about the original error that caused  
    -- execution to jump to the CATCH block.  
    RAISERROR (@ErrorMessage, -- Message text.  
         @ErrorSeverity, -- Severity.  
         @ErrorState -- State.   
         );  
                 
    end catch;  
   end   
 END
GO
/****** Object:  StoredProcedure [dbo].[SaveUnionCouncil]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SaveUnionCouncil] 

@Id	int,
@TownId	int,
@Name	varchar(100),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [UnionCouncil]
	set 
	[Name] =  @Name, TownId = @TownId,IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from UnionCouncil where Id = @Id
	end	
	else
	begin
	insert into UnionCouncil
	(TownId ,Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@TownId ,@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from UnionCouncil where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveTrackingDevice]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SaveTrackingDevice] 

@Id	int,
@TrackingNo	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [TrackingDevice]
	set 
	[TrackingNo]  =  @TrackingNo, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [TrackingDevice] where Id = @Id
	end	
	else
	begin
	insert into [TrackingDevice]
	(TrackingNo,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@TrackingNo,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [TrackingDevice] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveTown]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SaveTown] 

@Id	int,
@Name	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [Town]
	set 
	[Name] =  @Name, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [Town] where Id = @Id
	end	
	else
	begin
	insert into [Town]
	(Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [Town] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveRole]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[SaveRole] 

@Id	int,
@Name	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [Role]
	set 
	[Name] =  @Name, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [Role] where Id = @Id
	end	
	else
	begin
	insert into [Role]
	(Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [Role] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveRefundType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[SaveRefundType] 

@Id	int,
@Name	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [RefundType]
	set 
	[Name] =  @Name, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from RefundType where Id = @Id
	end	
	else
	begin
	insert into RefundType
	(Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from RefundType where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveRefundBooking]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveRefundBooking]     
@Id int,    
@BookingId int,    
@RefundTypeId int,    
@RefundReason nvarchar(500),    
@ActualBookingAmount money,    
@RefundAmount money,    
@RefundReceipt nvarchar(50),    
@RefundOfficeLocation int,    
@RefundOfficer int,    
@IsActive bit,    
@CreatedBy int,    
@ModifiedBy int,    
@ModifiedDate datetime    
     
AS    
    
BEGIN    
declare @newId int  
  
 if @Id is not null and @Id > 0    
 begin    
 set @newId=@Id  
 update [RefundBooking]     
 set     
 BookingId =  @BookingId,RefundTypeId= @RefundTypeId,RefundReason = @RefundReason,    
 ActualBookingAmount = @ActualBookingAmount,RefundAmount = @RefundAmount,RefundReceipt=@RefundReceipt,     
 RefundOfficeLocation = @RefundOfficeLocation, RefundOfficer = @RefundOfficer,    
 IsActive = @IsActive,CreatedBy = @CreatedBy,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate    
 where id = @newId    
  
 end     
 else    
 begin    
   
 
 insert into RefundBooking     
 (BookingId,ActualBookingAmount,RefundOfficeLocation,RefundTypeId,RefundAmount,RefundReason, RefundOfficer,RefundReceipt, IsActive,CreatedBy,ModifiedBy,ModifiedDate)    
 values    
 (@BookingId,@ActualBookingAmount,@RefundOfficeLocation,@RefundTypeId,@RefundAmount,@RefundReason,@RefundOfficer,@RefundReceipt,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)         
 set @newId=SCOPE_IDENTITY()   
  
 end    
  
 update Payment set PaymentStatus=2 where BookingId=@BookingId  
 update BusVisit set IsBookingCompleted=1 where BookingId=@BookingId  
     
 select isnull(rb.Id,0) Id ,  b.Id as BookingId , isnull(rb.RefundAmount, 0) RefundAmount ,      
 isnull(rb.RefundOfficeLocation,0)as RefundOfficeLocation , isnull(rb.RefundReason,'')as RefundReason ,     
 isnull(rb.RefundReceipt,'') RefundReceipt, isnull(rb.RefundTypeId, 0) as RefundTypeId ,     
 ISNULL(rb.ActualBookingAmount ,  p.Amount) as ActualBookingAmount, isnull(rb.RefundOfficer ,  0) as RefundOfficer,    
 isnull(rb.ActualBookingAmount,0) - ISNULL(rb.RefundAmount,0) as AmountDeducted , ISNULL(rb.IsActive ,  b.isactive) as IsActive,    
 ISNULL(rb.CreatedBy ,  b.CreatedBy) as CreatedBy, ISNULL(rb.CreatedDate ,b.CreatedDate) CreatedDate,    
 ISNULL(rb.ModifiedBy , b.ModifiedBy) ModifiedBy, ISNULL(rb.ModifiedDate, b.ModifiedDate) ModifiedDate    
 from Booking b     
 left join Payment p  on b.Id =  p.BookingId    
 left join RefundBooking rb  on b.Id = rb.BookingId    
 where rb.Id = @newId    
        
END
GO
/****** Object:  StoredProcedure [dbo].[SavePaymentType]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SavePaymentType] 

@Id	int,
@Name	varchar(50),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [PaymentType]
	set 
	[Name] =  @Name, IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from PaymentType where Id = @Id
	end	
	else
	begin
	insert into PaymentType
	(Name,IsActive,createdby,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from PaymentType where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SavePayment]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SavePayment]          
@Id int,       
@BookingId int,      
@PaymentType tinyint ,      
--@Pricing tinyint ,      
@Amount money,      
@PaymentLocation int,      
@OfficerId int ,      
@ReceiptNo nvarchar(100),      
@ExtraAmountCharge money=null,        
@ExtraAmountReason nvarchar(1000)=null,      
@ExtraAmountReceipt nvarchar(100)=null,      
@PaymentStatus tinyint,      
@EasyPaisaTranNo nvarchar(30)=null,    
@CreatedBy int,      
@ModifiedBy int,
@ModifiedDate datetime      
as          
      
IF @Id=null or @Id=0      
BEGIN      
 INSERT INTO Payment(BookingId,PaymentType,Amount,PaymentLocation,OfficerId,ReceiptNo,ExtraAmountCharge,ExtraAmountReason,ExtraAmountReceipt,PaymentStatus,EasyPaisaTranNo,CreatedBy,ModifiedBy)          
 VALUES(@BookingId,@PaymentType,@Amount,@PaymentLocation,@OfficerId,@ReceiptNo,@ExtraAmountCharge,@ExtraAmountReason,@ExtraAmountReceipt,@PaymentStatus,@EasyPaisaTranNo,@CreatedBy,@ModifiedBy)          
 select * from Payment where id=SCOPE_IDENTITY()       
END      
ELSE       
BEGIN      
 UPDATE Payment SET      
 BookingId=@BookingId,      
PaymentType=@PaymentType,      
Amount=@Amount,      
PaymentLocation=@PaymentLocation,      
OfficerId=@OfficerId,      
ReceiptNo=@ReceiptNo,      
ExtraAmountCharge=@ExtraAmountCharge,      
ExtraAmountReason=@ExtraAmountReason,      
ExtraAmountReceipt=@ExtraAmountReceipt,      
PaymentStatus=@PaymentStatus,      
EasyPaisaTranNo=@EasyPaisaTranNo,    
CreatedBy=@CreatedBy,      
ModifiedBy=@ModifiedBy,
ModifiedDate=@ModifiedDate      
 WHERE Id=@Id      
 select * from Payment where id=@Id      
END
GO
/****** Object:  StoredProcedure [dbo].[Lookup]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Lookup]                    
as                    
select Id,[Name] as Description from CauseOfDeath                  
select Id,[name]  as Description from Town                  
select Id,[name]  as Description,townid from UnionCouncil                  
select Id,name as Description,UcId from Landmark                  
select Id,name as Description,LandmarkId  from Graveyard                
select id,vehicleno as Description ,TrackingDeviceId from Bus              
select id,FirstName + ' ' + LastName as Description,Mobile from Driver              
select id,Name as Description from AlkhidmatCentre              
select id,(firstName + ' ' + lastname) as Description from [User] where RoleId=3              
select Id,Name as Description from PaymentType            
select Id,Name as Description from VisitType where IsActive=1 
select Id, Name as Description  from [Role]  r where r.IsActive =  1          
select Id, Name as Description  from [RefundType]  r where r.IsActive =  1
GO
/****** Object:  StoredProcedure [dbo].[GetVisitTypeById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetVisitTypeById]
@Id int
as
begin
select * from [VisitType] r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetVisitTypeByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetVisitTypeByCriteria]
@Name nvarchar(50)
as
begin
select * from [VisitType] r where r.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetUserById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetUserById]
@Id int
as
begin
select u.*,  ac.Name as CenterDesc, r.Name as RoleDesc 
from [User] u 
inner join AlkhidmatCentre ac on u.CentreId =  ac.Id
inner join [Role] r on u.RoleId =  r.Id 
where u.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetUserByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetUserByCriteria]
@UserName nvarchar(50),
@Password nvarchar(100)
as
begin
select u.*,  ac.Name as CenterDesc, r.Name as RoleDesc 
from [User] u 
inner join AlkhidmatCentre ac on u.CentreId =  ac.Id
inner join [Role] r on u.RoleId =  r.Id 
where u.UserName =  @UserName and u.Password = @Password and u.IsActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[GetUnionCouncilById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetUnionCouncilById]
@Id int
as
begin
select u.*, t.Name TownDesc from [UnionCouncil] u 
inner join Town t on u.TownId =  t.Id 
where u.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetUnionCouncilByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetUnionCouncilByCriteria]
@TownId int,
@Name nvarchar(100)
as
begin
select u.*, t.Name TownDesc from [UnionCouncil] u 
inner join Town t on u.TownId =  t.Id 
where u.TownId =  @TownId and u.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetTrackingDeviceById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetTrackingDeviceById]
@Id int
as
begin
select * from [TrackingDevice] r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetTrackingDeviceByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetTrackingDeviceByCriteria]
@TrackingNo nvarchar(50) 
as
begin
select * from [TrackingDevice]  r where r.TrackingNo =  @TrackingNo
end
GO
/****** Object:  StoredProcedure [dbo].[GetTownById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetTownById]
@Id int
as
begin
select * from [Town] r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetTownByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetTownByCriteria]
@Name nvarchar(50)
as
begin
select * from [Town] r where r.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetRoleById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetRoleById]
@Id int
as
begin
select * from [Role] r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetRoleByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetRoleByCriteria]
@Name nvarchar(50)
as
begin
select * from [Role] r where r.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetRefundTypeById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetRefundTypeById]
@Id int
as
begin
select * from RefundType r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetRefundTypeByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetRefundTypeByCriteria]
@Name nvarchar(50)
as
begin
select * from RefundType r where r.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetRefundBookingById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetRefundBookingById]	
@Id int
as
begin
select isnull(rb.Id,0) Id ,  b.Id as BookingId , isnull(rb.RefundAmount, 0) RefundAmount ,  
isnull(rb.RefundOfficeLocation,0)as RefundOfficeLocation , isnull(rb.RefundReason,'')as RefundReason , 
isnull(rb.RefundReceipt,'') RefundReceipt, isnull(rb.RefundTypeId, 0) as RefundTypeId , 
ISNULL(rb.ActualBookingAmount ,  p.Amount) as ActualBookingAmount,
   isnull(rb.ActualBookingAmount,0) - ISNULL(rb.RefundAmount,0) as AmountDeducted , isnull(rb.RefundOfficer ,  0) RefundOfficer,
   ISNULL(rb.IsActive ,  b.isactive) as IsActive,
   ISNULL(rb.CreatedBy ,  b.CreatedBy) as CreatedBy, ISNULL(rb.CreatedDate ,b.CreatedDate) CreatedDate,
   ISNULL(rb.ModifiedBy , b.ModifiedBy) ModifiedBy, ISNULL(rb.ModifiedDate, b.ModifiedDate) ModifiedDate
   from Booking b 
left join Payment p  on b.Id =  p.BookingId
left join RefundBooking rb  on b.Id = rb.BookingId

where b.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetRefundBookingByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetRefundBookingByCriteria]
@BookingId int,
@RefundOfficeLocation int,
@RefundTypeId tinyint

as
begin
select * from RefundBooking  r where r.BookingId =  @BookingId and r.RefundOfficeLocation = @RefundOfficeLocation
and r.RefundTypeId = @RefundTypeId
end
GO
/****** Object:  StoredProcedure [dbo].[GetNearestCentreByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetNearestCentreByCriteria]    
@Id int    
as    
begin    
select bv.Id, bv.BookingId,bv.OutTime,bv.ReturnTime,bk.Address,l.Name as BusPoint,g.Name as Graveyard,bk.MasjidName,[dbo].[GetPrayerTime](bk.NamazEJanazaHeldIn) as NamazEJanazaHeldIn,bk.NamazEJanazaLocation,bk.OtherDetail,bk.PickupDate,bk.PickupTime,bk.ReturnTime     
,b.VehicleNo,c.Name as CentreName,c.Address CenreAddress,c.ContactNo1,c.ContactNo2,(d.FirstName + ' ' + d.LastName) as fullName,d.Mobile as MobileNo,  
bv.IsActive,bv.CreatedBy,bv.CreatedDate,bv.ModifiedBy,bv.ModifiedDate  
from BusVisit bv     
inner join Driver d on d.Id=bv.DriverId and bv.BusId=@Id and VisitTypeId=2 and IsBookingCompleted=0 AND isnull(BookingId,0)<>0    
inner join Booking bk on bk.Id=bv.BookingId    
inner join Landmark l on l.Id=bk.BusPoint    
inner join Bus b on b.Id=bv.BusId    
inner join Graveyard g on g.Id=bk.GraveyardId    
inner join AlkhidmatCentre c on c.Id=bv.CentreId    
    
end
GO
/****** Object:  StoredProcedure [dbo].[GetLandmarkById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetLandmarkById]
@Id int
as
begin
select l.*, u.Name UcDesc from [Landmark] l 
inner join UnionCouncil u  on l.UcId =  u.Id
where l.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetLandmarkByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetLandmarkByCriteria]
@UcId int,
@Name nvarchar(100)
as
begin
select l.*, u.Name UcDesc from [Landmark] l 
inner join UnionCouncil u  on l.UcId =  u.Id
where l.UcId =  @UcId and l.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetGraveyardById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetGraveyardById]
@Id int
as
begin
select g.* ,  l.Name LandmarkDesc from [Graveyard] g 
inner join Landmark l on g.LandmarkId =  l.Id  
where g.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetGraveyardByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetGraveyardByCriteria]
@LandMarkId int,
@Name nvarchar(100)
as
begin
select g.* ,  l.Name LandmarkDesc from [Graveyard] g 
inner join Landmark l on g.LandmarkId =  l.Id  
where g.LandmarkId =  @LandMarkId and g.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetDriverById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetDriverById]
@Id int
as
begin
select d.* ,  c.Name CentreDesc from [Driver] d
	inner join AlkhidmatCentre c on c.id=d.centreid 
	 where d.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetDriverByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetDriverByCriteria]
@FirstName nvarchar(50)
as
begin
select d.* ,  c.Name from [Driver] d
	inner join AlkhidmatCentre c on c.id=d.centreid 

where d.FirstName = @FirstName and d.IsActive = 1
end
GO
/****** Object:  UserDefinedFunction [dbo].[GetCsvBuses]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetCsvBuses](    
    @CentreId AS INT    
)    
RETURNS VARCHAR(MAX)    
AS    
BEGIN    
declare @result varchar(max)        
--select @result = isnull(@result+'  |  ','')+ ISNULL(CONVERT(varchar,bv.IsBookingCompleted),'1') + ' ' + ISNULL(CONVERT(varchar, bv.BusId),'') + ' ' + b.VehicleNo     
--select @result = isnull(@result+'  |  ','')+ ISNULL(CONVERT(varchar,bv.IsBookingCompleted),'1') + ' ' + b.VehicleNo     
--from Bus b     
--left outer join BusVisit bv on b.id=bv.busId and bv.IsBookingCompleted=0 and bv.VisitTypeId=2    
--where b.CentreId=@CentreId    

select @result = isnull(@result+'  |  ','')+ ISNULL(CONVERT(varchar,IsBookingCompleted),'1') + ' ' + ISNULL(CONVERT(varchar, BusId),'') + ' ' + VehicleNo
from(
select distinct b.VehicleNo,ISNULL(bv.IsBookingCompleted,1) as IsBookingCompleted,bv.BusId
--select distinct @result = isnull(@result+'  |  ','')+ ISNULL(CONVERT(varchar,bv.IsBookingCompleted),'1') + ' ' + b.VehicleNo     
from Bus b     
left outer join BusVisit bv on b.id=bv.busId 
and bv.IsBookingCompleted=0 and bv.VisitTypeId=2   
where bv.CentreId=@CentreId
) o

return @result     
end
GO
/****** Object:  StoredProcedure [dbo].[GetCentreById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetCentreById]
@Id int
as
begin
select * from [AlkhidmatCentre] c where c.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetCentreByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create  procedure [dbo].[GetCentreByCriteria]
@Name nvarchar(50)
as
begin
select * from [AlkhidmatCentre] c where c.Name = @Name and c.IsActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[GetCauseofDeathById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetCauseofDeathById]
@Id int
as
begin
select * from [CauseOfDeath] c where c.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetCauseofDeathByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetCauseofDeathByCriteria]
@Name nvarchar(100)
as
begin
select * from [CauseOfDeath] c where c.[Name] =  @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetBusVisitCount]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[GetBusVisitCount]
as
select COUNT(id) as resultCount from BusVisit
GO
/****** Object:  StoredProcedure [dbo].[GetBusVisitById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBusVisitById]  
@Id int  
as  
begin  
select bv.*,t.Name as VisitType ,b.VehicleNo as BusDesc,(d.FirstName + ' ' + d.LastName) as DriverDesc,a.Name as CentreDesc     
from BusVisit bv   
inner join Bus b on b.Id=bv.BusId  
inner join Driver d on d.Id=bv.DriverId  
inner join AlkhidmatCentre a on a.Id=bv.CentreId  
left join VisitType t on t.Id=bv.VisitTypeId  
where bv.IsActive=1 and bv.Id=@Id  

end
GO
/****** Object:  StoredProcedure [dbo].[GetBusVisitByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetBusVisitByCriteria]    
@BookingId int   
as    
begin    
select b.*,vt.Name as VisitType,bus.VehicleNo as busDesc,(d.FirstName + ',' + d.LastName) as driverDesc,c.Name as centreDesc  from [BusVisit] b   
inner join Bus on bus.Id=b.BusId  
inner join Driver d on d.Id=b.DriverId  
inner join AlkhidmatCentre c on c.Id=b.CentreId  
inner join VisitType vt on b.VisitTypeId=vt.Id
where b.BookingId=@BookingId and b.IsActive=1     
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetOfficer]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetOfficer](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = u.FirstName + ' ' + u.LastName  from [User] u where id = @Id
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetLandmark]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetLandmark](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = Name from Landmark  where id =  @Id
return @result   
end
GO
/****** Object:  UserDefinedFunction [dbo].[fn_GetGraveyard]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[fn_GetGraveyard](                  
    @Id as int  
    )          
RETURNS VARCHAR(500)          
AS          
begin  
declare @result varchar(max)              
  
select @result = name from Graveyard where id =  @Id
return @result   
end
GO
/****** Object:  StoredProcedure [dbo].[GetBusById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetBusById]
@Id int
as
begin
select b.*,c.name as CentreDesc from [Bus] b 
 inner join AlkhidmatCentre c on c.id=b.centreid where b.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetBusByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetBusByCriteria]
@VehicleNo nvarchar(50)
as
begin
select b.*,c.name as CentreDesc from [Bus] b 
 inner join AlkhidmatCentre c on c.id=b.centreid
  where b.VehicleNo  =  @VehicleNo and b.IsActive = 1
end
GO
/****** Object:  StoredProcedure [dbo].[GetBusAvailabilityByBookingId]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Procedure [dbo].[GetBusAvailabilityByBookingId]
@BookingId int
as
declare @NamazEJanazaHeldIn tinyint
declare @PickupDate  datetime
--set @BookingId=65

select @NamazEJanazaHeldIn=NamazEJanazaHeldIn,@PickupDate=PickupDate from Booking where id=@BookingId

select id,(ob.vehicleno + ' - Available')  as Description ,TrackingDeviceId,IsActive,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate from Bus ob
where id not in
(
select Bus.ID
from Bus 
inner join BusVisit bv on bv.BusId=bus.Id
inner join booking b on b.Id=bv.BookingId
where b.NamazEJanazaHeldIn=@NamazEJanazaHeldIn and b.PickupDate=@PickupDate and bv.IsBookingCompleted=0
)
union
select bus.Id,
case isnull(p.PaymentType,0) 
when 1 then (Bus.vehicleno + ' - Booked - Paid')
when 2 then (Bus.vehicleno + ' - Booked - Unpaid')
else (Bus.vehicleno + ' - Available')
end  as Description ,
TrackingDeviceId ,Bus.IsActive,Bus.CreatedBy,Bus.CreatedDate,Bus.ModifiedBy,Bus.ModifiedDate
from Bus 
inner join BusVisit bv on bv.BusId=bus.Id
inner join booking b on b.Id=bv.BookingId
left join Payment p on p.BookingId=b.Id
where b.NamazEJanazaHeldIn=@NamazEJanazaHeldIn and b.PickupDate=@PickupDate  and bv.IsBookingCompleted=0
GO
/****** Object:  UserDefinedFunction [dbo].[GetBusAvailability]    Script Date: 12/07/2014 17:56:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[GetBusAvailability](      
    @BusId as int,
    @NamazEJanazaHeldIn tinyint,
    @PickupDate datetime
)  
RETURNS VARCHAR(20)  
AS  
BEGIN  
declare @result tinyint

select  @result=COUNT(bv.Id) from BusVisit bv 
inner join Booking b on b.Id=bv.BookingId 
where bv.BusId=@BusId and b.NamazEJanazaHeldIn=@NamazEJanazaHeldIn and b.PickupDate=@PickupDate

return @result   
end
GO
/****** Object:  StoredProcedure [dbo].[GetPaymentTypeById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetPaymentTypeById]
@Id int
as
begin
select * from PaymentType r where r.Id =  @Id
end
GO
/****** Object:  StoredProcedure [dbo].[GetPaymentTypeByCriteria]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create  procedure [dbo].[GetPaymentTypeByCriteria]
@Name nvarchar(50)
as
begin
select * from PaymentType r where r.Name = @Name
end
GO
/****** Object:  StoredProcedure [dbo].[GetPaymentById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetPaymentById]  
@Id int  
AS  
select * from Payment where bookingId=@id
GO
/****** Object:  StoredProcedure [dbo].[ResetUserPassword]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[ResetUserPassword]
@UserId int,
@Password nvarchar(50)
AS
BEGIN
	update [User] set [Password] = @Password where id =  @UserId
	
	if @@ROWCOUNT <=0
	begin
		RAISERROR ('User Password has not been reset successfully.', -- Message text.  
         16, -- Severity.  
         1 -- State.   
         );  
	end
END
GO
/****** Object:  StoredProcedure [dbo].[SaveLandmark]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveLandmark] 

@Id	int,
@UcId	int,
@Name	varchar(100),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [Landmark]
	set 
	[Name] =  @Name, UcId = @UcId,IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select l.*, u.Name UcDesc from [Landmark] l 
inner join UnionCouncil u  on l.UcId =  u.Id where l.Id = @Id
	end	
	else
	begin
	insert into Landmark
	(UcId ,Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@UcId ,@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select l.*, u.Name UcDesc from [Landmark] l 
inner join UnionCouncil u  on l.UcId =  u.Id where l.Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveGraveyard]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveGraveyard] 

@Id	int,
@LandmarkId	int,
@Name	varchar(100),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [Graveyard]
	set 
	[Name] =  @Name, LandmarkId = @LandmarkId,IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select g.* ,  l.Name LandmarkDesc from [Graveyard] g 
inner join Landmark l on g.LandmarkId =  l.Id   where g.Id = @Id
	end	
	else
	begin
	insert into Graveyard
	(LandmarkId,Name,IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@LandmarkId ,@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select g.* ,  l.Name LandmarkDesc from [Graveyard] g 
inner join Landmark l on g.LandmarkId =  l.Id   where g.Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveDriver]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveDriver] 
@Id	int,
@CentreId	int,
@FirstName	nvarchar(50),
@LastName	nvarchar(50),
@CNIC	nvarchar(13),
@Mobile	nvarchar(13),
@Address	nvarchar(200),
@City	nvarchar(50)= null,
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate DateTime
AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [Driver]
	set 
	CentreId =  @CentreId,FirstName =  @FirstName,LastName =  @LastName,CNIC = @CNIC,Mobile = @Mobile,[Address] =  @Address,City = @City,IsActive = @IsActive,CreatedBy = @CreatedBy,ModifiedBy = @ModifiedBy , ModifiedDate = @ModifiedDate
	where id = @Id
	select d.* ,  c.Name CentreDesc from [Driver] d
	inner join AlkhidmatCentre c on c.id=d.centreid where d.Id = @Id
	end	
	else
	begin
	insert into Driver
	(CentreId,FirstName,LastName,CNIC,Mobile,[Address],City,IsActive,CreatedBy,ModifiedBy)
	values
	(@CentreId,@FirstName,@LastName,@CNIC,@Mobile,@Address,@City,@IsActive,@CreatedBy,@ModifiedBy)
	select d.* ,  c.Name CentreDesc from [Driver] d
	inner join AlkhidmatCentre c on c.id=d.centreid where d.Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveCentre]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveCentre]   
@Id int,  
@Name nvarchar(50),  
@Address varchar(500),
@ContactNo1	varchar(15),
@ContactNo2	varchar(15)=null,
@LandmarkId int,  
@IsCoPartner bit,  
@IsActive bit,  
@CreatedBy int,  
@ModifiedBy int,  
@ModifiedDate datetime  
  
AS  
BEGIN   
 if @Id is not null and @Id > 0  
 begin  
 update [AlkhidmatCentre]  
 set   
 Name =  @Name,
 Address=@Address,
 ContactNo1=@ContactNo1,
 ContactNo2=@ContactNo2, 
 LandmarkId = @LandmarkId,
 IsCoPartner = @IsCoPartner,
 IsActive = @IsActive,
 ModifiedBy = @ModifiedBy,
 ModifiedDate = @ModifiedDate  
 where id = @Id  
 select * from [AlkhidmatCentre] where Id = @Id  
 end   
 else  
 begin  
 insert into [AlkhidmatCentre]  
 (Name,Address,ContactNo1,ContactNo2,LandmarkId,IsCoPartner,IsActive,CreatedBy,ModifiedBy,ModifiedDate)  
 values  
 (@Name,@Address,@ContactNo1,@ContactNo2,@LandmarkId,@IsCoPartner,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)  
 select * from [AlkhidmatCentre] where Id = SCOPE_IDENTITY()  
 end  
   
END
GO
/****** Object:  StoredProcedure [dbo].[SaveCauseofDeath]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveCauseofDeath] 
@Id	int,
@Name nvarchar(100),
@IsActive	bit,
@CreatedBy	int,
@ModifiedBy	int,
@ModifiedDate	datetime

AS
BEGIN	
	if @Id is not null and @Id > 0
	begin
	update [CauseOfDeath]
	set 
	[Name] =  @Name,IsActive = @IsActive,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate
	where id = @Id
	select * from [CauseOfDeath] where Id = @Id
	end	
	else
	begin
	insert into CauseOfDeath
	([Name],IsActive,CreatedBy,ModifiedBy,ModifiedDate)
	values
	(@Name,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)
	select * from [CauseOfDeath] where Id = SCOPE_IDENTITY()
	end
	
END
GO
/****** Object:  StoredProcedure [dbo].[SaveBusVisit]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SaveBusVisit]      
@Id int,      
@CentreId int,      
@BusId int,      
@DriverId int,      
@VisitTypeId int,      
@BookingId int,      
@InchargeName nvarchar(30)=null,    
@VisitDate DateTime=null,    
@OutTime tinyint,    
@ReturnTime tinyint,    
@ReadingWhenFilling bigint,    
@PumpLocation nvarchar(50)=null,    
@FuelRate money,    
@FuelAmount money,    
@IsBookingCompleted bit,      
@InitialReading bigint,      
@FinalReading bigint,      
@Description nvarchar(300)=null,    
@IsActive bit,      
@CreatedBy int,      
@ModifiedBy int,      
@ModifiedDate datetime      
      
as      
begin  
declare @newId int    
if @Id is not null and @Id > 0      
 begin  
 set @newId=@Id    
 update [BusVisit]      
 set       
 CentreId = @CentreId,BusId = @BusId,DriverId = @DriverId,VisitTypeId=  @VisitTypeId,BookingId = @BookingId, InchargeName=@InchargeName,VisitDate=@VisitDate,OutTime=@OutTime,ReturnTime=@ReturnTime,ReadingWhenFilling=@ReadingWhenFilling,PumpLocation=@PumpLocation,FuelRate=@FuelRate,FuelAmount=@FuelAmount,IsBookingCompleted=@IsBookingCompleted, InitialReading = @InitialReading,FinalReading= @FinalReading,Description=@Description,IsActive = @IsActive,CreatedBy = @CreatedBy,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate      
 where id = @Id       
 end       
 else      
 begin      

 insert into BusVisit      
 (CentreId,BusId,DriverId,VisitTypeId,BookingId,InchargeName,VisitDate,OutTime,ReturnTime,ReadingWhenFilling,PumpLocation,FuelRate,FuelAmount,IsBookingCompleted,InitialReading,FinalReading,Description,CreatedBy,ModifiedBy,ModifiedDate)      
 values      
 (@CentreId,@BusId,@DriverId,@VisitTypeId,@BookingId,@InchargeName,@VisitDate,@OutTime,@ReturnTime,@ReadingWhenFilling,@PumpLocation,@FuelRate,@FuelAmount,@IsBookingCompleted,@InitialReading,@FinalReading,@Description,@CreatedBy,@ModifiedBy,@ModifiedDate)  
 set @newId=SCOPE_IDENTITY()

end      

--update BusVisit set FinalReading=@ReadingWhenFilling where id=(select top 1 id from BusVisit where id<>@newId and BusId=@BusId order by VisitDate desc,CreatedDate desc)
update BusVisit set BusStatus=3 where id=@newId
update BusVisit set VisitDate=b.PickupDate,OutTime=b.PickupTime,ReturnTime=b.ReturnTime from Booking b inner join BusVisit bv on b.Id=bv.BookingId
select bv.*,t.Name as VisitType ,b.VehicleNo as BusDesc,(d.FirstName + ' ' + d.LastName) as DriverDesc,a.Name as CentreDesc         
from BusVisit bv       
inner join Bus b on b.Id=bv.BusId      
inner join Driver d on d.Id=bv.DriverId      
inner join AlkhidmatCentre a on a.Id=bv.CentreId      
inner join VisitType t on t.Id=bv.VisitTypeId  where bv.Id = @newId 

end
GO
/****** Object:  StoredProcedure [dbo].[SaveBus]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveBus]       
@Id int,      
@CentreId int,        
@VehicleNo varchar(50),    
@TrackingDeviceId varchar(50)=null,      
@ModelNo varchar(50),      
@No varchar(50)=null,      
@InitialReading bigint,
@Description nvarchar(200)=null,      
@IsActive bit,      
@CreatedBy int,      
@ModifiedBy int,      
@ModifiedDate datetime      
      
AS      
BEGIN       
 if @Id is not null and @Id > 0      
 begin      
 update [Bus]      
 set       
 CentreId = @CentreId,TrackingDeviceId = @TrackingDeviceId,VehicleNo  = @VehicleNo,ModelNo = @ModelNo, [No] =  @No,InitialReading=@InitialReading, [Description]= @Description,IsActive = @IsActive,CreatedBy = @CreatedBy,ModifiedBy = @ModifiedBy,ModifiedDate = @ModifiedDate      
 where id = @Id   
      
 select b.*,c.name as CentreDesc from [Bus] b   
 inner join AlkhidmatCentre c on c.id=b.centreid  
  where b.Id = @Id      
 end       
 else      
 begin      
 insert into Bus      
 (CentreId,TrackingDeviceId,VehicleNo ,ModelNo, [No],InitialReading,[Description],IsActive,CreatedBy,ModifiedBy,ModifiedDate)      
 values      
 (@CentreId,@TrackingDeviceId,@VehicleNo,@ModelNo, @No,@InitialReading,@Description,@IsActive,@CreatedBy,@ModifiedBy,@ModifiedDate)      
   
 select b.*,c.name as CentreDesc from [Bus] b   
 inner join AlkhidmatCentre c on c.id=b.centreid  
  where b.Id = SCOPE_IDENTITY()      
 end      
       
END
GO
/****** Object:  StoredProcedure [dbo].[SaveBooking]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SaveBooking]            
@Id int=null,        
@ContactName nvarchar(100),      
@ContactMobile nvarchar(100),      
@ContactNic nvarchar(100)=null,      
@DeseasedName nvarchar(100)=null,      
@DeseasedAge smallint=null,      
@DeseasedGender smallint=null,      
@CauseOfDeath smallint=null,      
@Address varchar(50)=null,      
@BusPoint int =null,      
@LandmarkId int =null,      
@UnionCouncilId int =null,      
@TownId int =null,      
@PickupDate datetime =null,      
@PickupTime smallint =null,      
@ReturnTime smallint =null,      
@GraveyardId smallint=null,      
@NamazEJanazaHeldIn smallint=null,       
@NamazEJanazaLocation nvarchar(100)=null,      
@MasjidName nvarchar(100)=null,      
@OtherDetail nvarchar(400)=null,  
@CreatedBy int,  
@ModifiedBy int,  
@ModifiedDate datetime,  
@IsActive bit=1      
as            
        
IF @Id=null or @Id=0        
BEGIN        
 INSERT INTO Booking(ContactName,ContactMobile,ContactNic,DeseasedName,DeseasedAge,DeseasedGender,CauseOfDeath,Address,BusPoint,LandmarkId,UnionCouncilId,TownId,PickupDate,PickupTime,ReturnTime,GraveyardId,NamazEJanazaHeldIn,NamazEJanazaLocation,MasjidName,OtherDetail,CreatedBy,ModifiedBy,ModifiedDate)         
         
 VALUES(@ContactName,@ContactMobile,@ContactNic,@DeseasedName,@DeseasedAge,@DeseasedGender,@CauseOfDeath,@Address,@BusPoint,@LandmarkId,@UnionCouncilId,@TownId,@PickupDate,@PickupTime,@ReturnTime,@GraveyardId,@NamazEJanazaHeldIn,@NamazEJanazaLocation,@MasjidName,@OtherDetail,@CreatedBy,@ModifiedBy,@ModifiedDate)            
 select * from Booking where id=SCOPE_IDENTITY()         
END        
ELSE         
BEGIN        
 UPDATE Booking SET        
 ContactName = @ContactName,        
 ContactMobile=@ContactMobile,        
 ContactNic=@ContactNic,        
 DeseasedName=@DeseasedName,        
 DeseasedAge=@DeseasedAge,        
 DeseasedGender=@DeseasedGender,        
 CauseOfDeath=@CauseOfDeath,        
 Address=@Address,        
 BusPoint=@BusPoint,        
 LandmarkId=@LandmarkId,        
 UnionCouncilId=@UnionCouncilId,        
 TownId=@TownId,        
 PickupDate=@PickupDate,    
 PickupTime=@PickupTime,        
 ReturnTime=@ReturnTime,        
 GraveyardId=@GraveyardId,        
 NamazEJanazaHeldIn=@NamazEJanazaHeldIn,      
NamazEJanazaLocation=@NamazEJanazaLocation,      
MasjidName=@MasjidName,      
OtherDetail=@OtherDetail,  
ModifiedBy=@ModifiedBy,  
ModifiedDate=@ModifiedDate  
 WHERE Id=@Id        
 select * from Booking where id=@Id        
END
GO
/****** Object:  StoredProcedure [dbo].[RptCentreSummary]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[RptCentreSummary]  
as  
select * from
(
select ac.Id as centreId, ac.Name as centreName,pt.Name as PaymentType, COUNT(b.Id) as BookingCount from AlkhidmatCentre ac
inner join BusVisit bv on ac.Id=bv.CentreId
inner join Booking b on b.Id=bv.BookingId
inner join Payment p on b.Id=p.BookingId
inner join PaymentType pt on pt.Id=p.PaymentType
group by ac.Id,ac.Name,pt.Name
) q
pivot
(
	sum(BookingCount)  for PaymentType in([Cash],[EasyPaisa])
) p
GO
/****** Object:  StoredProcedure [dbo].[RptBusVisitSummary]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[RptBusVisitSummary]
as
select busId, VehicleNo,CONVERT(varchar,SUM(milage)) + ' km' as milage,COUNT(BusVisitId) as visitCount  from AdminSummary_View
group by busId,VehicleNo,VisitTypeId 
having VisitTypeId =2
GO
/****** Object:  StoredProcedure [dbo].[RptBusVisitDetail]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RptBusVisitDetail]
@busId int
as
select * from AdminSummary_View where busid=@busId and VisitTypeId=2
GO
/****** Object:  StoredProcedure [dbo].[RptBusMilageSummary]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[RptBusMilageSummary]
as
select busId, VehicleNo,CONVERT(varchar,SUM(milage)) + ' km' as milage,COUNT(BusVisitId) as visitCount  from AdminSummary_View
group by busId,VehicleNo,VisitTypeId
having VisitTypeId not in(2)
GO
/****** Object:  StoredProcedure [dbo].[RptBusMilageDetail]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RptBusMilageDetail]
@busId int
as
select * from AdminSummary_View where busid=@busId and VisitTypeId not in(2)
GO
/****** Object:  StoredProcedure [dbo].[RptDriverSummary]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[RptDriverSummary]
as
select driverId,Driver as DriverName,CONVERT(varchar,SUM(milage)) + ' km' as milage,COUNT(BusVisitId) as visitCount from AdminSummary_View
group by driverId,Driver
GO
/****** Object:  StoredProcedure [dbo].[RptDriverDetail]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RptDriverDetail]
@driverId int
as
select driverId, driver as driverName,VehicleNo,visitDate,visitInterval,bookingId from AdminSummary_View where DriverId=@driverId
GO
/****** Object:  StoredProcedure [dbo].[GetNearestCentreById]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetNearestCentreById]      
@Id int      
as      
begin      
select nc.Id,c.Id as centreId,c.Name as centreName, dbo.GetCsvBuses(c.Id) busList,c.Address,c.ContactNo1,c.ContactNo2,    
nc.CreatedBy,nc.ModifiedBy,nc.IsActive,nc.CreatedDate,nc.ModifiedDate,nc.NearestLevel     
from NearestCentre nc     
inner join AlkhidmatCentre c on c.Id=nc.NearestCentreId    
where nc.CentreId=@Id   
  
--union   
--select c.Id,c.Id as centreId,c.Name as centreName, dbo.GetCsvBuses(c.Id) busList,c.Address,c.ContactNo1,c.ContactNo2,    
--nc.CreatedBy,nc.ModifiedBy,nc.IsActive,nc.CreatedDate,nc.ModifiedDate,0 as NearestLevel     
--from NearestCentre nc     
--inner join AlkhidmatCentre c on c.Id=nc.NearestCentreId    
--where c.Id=@Id 
order by NearestLevel   
  
end
GO
/****** Object:  StoredProcedure [dbo].[GetBookingStatstics]    Script Date: 12/07/2014 17:56:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  procedure [dbo].[GetBookingStatstics] 
@OfficerId int
as

declare @TodaysBooking int, @UserPiadBooking int, @UserUnpaidBooking int,@UserCancelBooking int
begin
select @TodaysBooking = isnull(COUNT(*),0) from CCTracking_View cctv where LEFT(CONVERT(VARCHAR, cctv.PickupDate, 120), 10) =  LEFT(CONVERT(VARCHAR, GETDATE(), 120), 10)
select @UserPiadBooking =  isnull(COUNT(*),0) FROM CCTracking_View cctv where cctv.BookingUser =  @OfficerId and cctv.PaymentStatus = 1
select @UserUnpaidBooking =  isnull(COUNT(*),0) FROM CCTracking_View cctv where cctv.BookingUser =  @OfficerId and isnull(cctv.PaymentStatus,0) = 0
select @UserCancelBooking =  isnull(COUNT(*),0) FROM CCTracking_View cctv where cctv.BookingUser =  @OfficerId and isnull(cctv.PaymentStatus,0) = 2
 
 
 select @TodaysBooking TodaysBooking, @UserPiadBooking + @UserUnpaidBooking + @UserCancelBooking as UserTotalBooking, @UserPiadBooking UserPiadBooking, @UserUnpaidBooking UserUnpaidBooking
end
GO

/****** Object:  Default [DF_AlkhidmatCentre_IsCoPartner]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[AlkhidmatCentre] ADD  CONSTRAINT [DF_AlkhidmatCentre_IsCoPartner]  DEFAULT ((0)) FOR [IsCoPartner]
GO
/****** Object:  Default [DF_AlkhidmatCentre_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[AlkhidmatCentre] ADD  CONSTRAINT [DF_AlkhidmatCentre_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_AlkhidmatCentre_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[AlkhidmatCentre] ADD  CONSTRAINT [DF_AlkhidmatCentre_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_AlkhidmatCentre_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[AlkhidmatCentre] ADD  CONSTRAINT [DF_AlkhidmatCentre_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Booking_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Booking] ADD  CONSTRAINT [DF_Booking_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Booking_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Booking] ADD  CONSTRAINT [DF_Booking_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Booking_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Booking] ADD  CONSTRAINT [DF_Booking_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Bus_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Bus] ADD  CONSTRAINT [DF_Bus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Bus_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Bus] ADD  CONSTRAINT [DF_Bus_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Bus_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Bus] ADD  CONSTRAINT [DF_Bus_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_BusVisit_IsAvailableForBooking]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[BusVisit] ADD  CONSTRAINT [DF_BusVisit_IsAvailableForBooking]  DEFAULT ((0)) FOR [IsBookingCompleted]
GO
/****** Object:  Default [DF_BusVisit_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[BusVisit] ADD  CONSTRAINT [DF_BusVisit_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_BusVisit_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[BusVisit] ADD  CONSTRAINT [DF_BusVisit_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_BusVisit_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[BusVisit] ADD  CONSTRAINT [DF_BusVisit_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_CauseOfDeath_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[CauseOfDeath] ADD  CONSTRAINT [DF_CauseOfDeath_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_CauseOfDeath_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[CauseOfDeath] ADD  CONSTRAINT [DF_CauseOfDeath_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_CauseOfDeath_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[CauseOfDeath] ADD  CONSTRAINT [DF_CauseOfDeath_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Driver_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Driver] ADD  CONSTRAINT [DF_Driver_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Driver_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Driver] ADD  CONSTRAINT [DF_Driver_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Driver_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Driver] ADD  CONSTRAINT [DF_Driver_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Graveyard_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Graveyard] ADD  CONSTRAINT [DF_Graveyard_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Graveyard_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Graveyard] ADD  CONSTRAINT [DF_Graveyard_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Graveyard_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Graveyard] ADD  CONSTRAINT [DF_Graveyard_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Landmark_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Landmark] ADD  CONSTRAINT [DF_Landmark_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Landmark_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Landmark] ADD  CONSTRAINT [DF_Landmark_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Landmark_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Landmark] ADD  CONSTRAINT [DF_Landmark_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_NearestAlkhidmatCentre_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[NearestCentre] ADD  CONSTRAINT [DF_NearestAlkhidmatCentre_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_NearestAlkhidmatCentre_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[NearestCentre] ADD  CONSTRAINT [DF_NearestAlkhidmatCentre_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_NearestAlkhidmatCentre_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[NearestCentre] ADD  CONSTRAINT [DF_NearestAlkhidmatCentre_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_BookingPayment_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Payment] ADD  CONSTRAINT [DF_BookingPayment_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_BookingPayment_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Payment] ADD  CONSTRAINT [DF_BookingPayment_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_PaymentType_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_PaymentType_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_PaymentType_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[PaymentType] ADD  CONSTRAINT [DF_PaymentType_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_RefundBooking_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundBooking] ADD  CONSTRAINT [DF_RefundBooking_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_RefundBooking_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundBooking] ADD  CONSTRAINT [DF_RefundBooking_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_RefundBooking_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundBooking] ADD  CONSTRAINT [DF_RefundBooking_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_RefundType_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundType] ADD  CONSTRAINT [DF_RefundType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_RefundType_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundType] ADD  CONSTRAINT [DF_RefundType_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_RefundType_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[RefundType] ADD  CONSTRAINT [DF_RefundType_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Role_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [DF_Role_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Role_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [DF_Role_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Role_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Role] ADD  CONSTRAINT [DF_Role_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_TimeSlot_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TimeSlot] ADD  CONSTRAINT [DF_TimeSlot_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_TimeSlot_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TimeSlot] ADD  CONSTRAINT [DF_TimeSlot_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_TimeSlot_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TimeSlot] ADD  CONSTRAINT [DF_TimeSlot_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_Town_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Town] ADD  CONSTRAINT [DF_Town_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_Town_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Town] ADD  CONSTRAINT [DF_Town_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_Town_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[Town] ADD  CONSTRAINT [DF_Town_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_TrackingDevice_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TrackingDevice] ADD  CONSTRAINT [DF_TrackingDevice_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_TrackingDevice_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TrackingDevice] ADD  CONSTRAINT [DF_TrackingDevice_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_TrackingDevice_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[TrackingDevice] ADD  CONSTRAINT [DF_TrackingDevice_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_UnionCouncil_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[UnionCouncil] ADD  CONSTRAINT [DF_UnionCouncil_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_UnionCouncil_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[UnionCouncil] ADD  CONSTRAINT [DF_UnionCouncil_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_UnionCouncil_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[UnionCouncil] ADD  CONSTRAINT [DF_UnionCouncil_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_User_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_User_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_User_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [DF_User_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
/****** Object:  Default [DF_VisitType_IsActive]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[VisitType] ADD  CONSTRAINT [DF_VisitType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
/****** Object:  Default [DF_VisitType_CreatedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[VisitType] ADD  CONSTRAINT [DF_VisitType_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
/****** Object:  Default [DF_VisitType_ModifiedDate]    Script Date: 12/07/2014 17:56:42 ******/
ALTER TABLE [dbo].[VisitType] ADD  CONSTRAINT [DF_VisitType_ModifiedDate]  DEFAULT (getdate()) FOR [ModifiedDate]
GO
