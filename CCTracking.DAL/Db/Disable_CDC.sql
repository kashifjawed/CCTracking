DECLARE @tableName NVARCHAR(100);
DECLARE myCursor CURSOR FORWARD_ONLY FAST_FORWARD READ_ONLY
FOR
    SELECT  QUOTENAME(t.name) AS name
    FROM    sys.tables t
            JOIN sys.schemas s ON t.schema_id = s.schema_id
    WHERE   s.name = 'cdc'
OPEN myCursor 
FETCH FROM myCursor INTO @TableName 
WHILE ( @@Fetch_Status = 0 ) 
    BEGIN 

        EXEC ( 'drop table cdc.' + @TableName + '; ' );
        FETCH NEXT FROM myCursor INTO @TableName 
    END  
CLOSE myCursor 
DEALLOCATE myCursor;
go

DECLARE @prName NVARCHAR(100);
DECLARE myCursor2 CURSOR FORWARD_ONLY FAST_FORWARD READ_ONLY
FOR
    SELECT  QUOTENAME(pr.name) AS name
    FROM    sys.procedures pr
            JOIN sys.schemas s ON pr.schema_id = s.schema_id
    WHERE   s.name = 'cdc'
OPEN myCursor2 
FETCH FROM myCursor2 INTO @prName 
WHILE ( @@Fetch_Status = 0 ) 
    BEGIN 
        EXEC ( 'drop procedure cdc.' + @prName + '; ' );
        FETCH NEXT FROM myCursor2 INTO @prName 
    END  
CLOSE myCursor2
DEALLOCATE myCursor2 

GO

DECLARE @fnName NVARCHAR(100);
DECLARE myCursor3 CURSOR FORWARD_ONLY FAST_FORWARD READ_ONLY
FOR
    SELECT  QUOTENAME(fn.name) AS name
    FROM    sys.objects fn
            JOIN sys.schemas s ON fn.schema_id = s.schema_id
    WHERE   fn.type IN ( 'FN', 'IF', 'TF' )
            AND s.name = 'cdc'
OPEN myCursor3 
FETCH FROM myCursor3 INTO @fnName 
WHILE ( @@Fetch_Status = 0 ) 
    BEGIN 
        EXEC ( 'drop function cdc.' + @fnName + '; ' );
        FETCH NEXT FROM myCursor3 INTO @fnName 
    END  
CLOSE myCursor3
DEALLOCATE myCursor3 
go
DECLARE @ruleName NVARCHAR(100);
SELECT  @ruleName = DP1.name
FROM    sys.database_principals AS DP1
        JOIN sys.database_principals AS DP2 ON DP1.owning_principal_id = DP2.principal_id
WHERE   DP1.type = 'R'
        AND DP2.name = 'cdc';
select @ruleName
EXEC ('ALTER AUTHORIZATION ON ROLE::'+@ruleName+' TO dbo; ')
go 
DROP SCHEMA [cdc]
GO
DROP USER [cdc]
GO