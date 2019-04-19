use Doitsu_Fandom_Dev

-- Create a new table called '[Tag]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[Tag]', 'U') IS NOT NULL
DROP TABLE [dbo].[Tag]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[Tag]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [Title] NVARCHAR(128) NOT NULL,
    -- Specify more columns here
);
GO
-- Add a new column '[Active]' to table '[Tag]' in schema '[dbo]'
ALTER TABLE [dbo].[Tag]
    ADD [Active] BIT NOT NULL
GO
ALTER TABLE [dbo].[BlogTag]
    ADD CONSTRAINT DF_Tag_Active DEFAULT 1 FOR Active
GO


-- Create a new table called '[BlogTag]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[BlogTag]', 'U') IS NOT NULL
DROP TABLE [dbo].[BlogTag]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[BlogTag]
(
    [Id] INT NOT NULL PRIMARY KEY, -- Primary Key column
    [BlogId] INT NOT NULL FOREIGN KEY REFERENCES Blogs(Id),
    [TagId] INT NOT NULL FOREIGN KEY REFERENCES Tag(Id),
    -- Specify more columns here
);
GO
ALTER TABLE [dbo].[BlogTag]
    ADD [Active] BIT NOT NULL
GO
ALTER TABLE [dbo].[BlogTag]
    ADD CONSTRAINT DF_BlogTag_Active DEFAULT 1 FOR Active
GO