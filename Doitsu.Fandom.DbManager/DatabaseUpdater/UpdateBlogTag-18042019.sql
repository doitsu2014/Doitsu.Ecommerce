use Doitsu_Fandom_Sandbox

-- Create a new table called '[Tag]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[Tag]', 'U') IS NOT NULL
DROP TABLE [dbo].[Tag]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[Tag]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY, -- Primary Key column
    [Title] NVARCHAR(128) NOT NULL,
    [Active] BIT NOT NULL
    -- Specify more columns here
);
GO
ALTER TABLE [dbo].[Tag]
    ADD CONSTRAINT DF_Tag_Active DEFAULT 0 FOR Active
GO

-- Create a new table called '[BlogTag]' in schema '[dbo]'
-- Drop the table if it already exists
IF OBJECT_ID('[dbo].[BlogTag]', 'U') IS NOT NULL
DROP TABLE [dbo].[BlogTag]
GO
-- Create the table in the specified schema
CREATE TABLE [dbo].[BlogTag]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY, -- Primary Key column
    [BlogId] INT NOT NULL FOREIGN KEY REFERENCES Blogs(Id),
    [TagId] INT NOT NULL FOREIGN KEY REFERENCES Tag(Id),
    [Active] BIT NOT NULL
    -- Specify more columns here
);
GO
ALTER TABLE [dbo].[BlogTag]
    ADD CONSTRAINT DF_BlogTag_Active DEFAULT 0 FOR Active
GO

-- Index Tag
-- Create a nonclustered index with or without a unique constraint
-- Or create a clustered index on table '[Tag]' in schema '[dbo]' in database '[Doitsu_]'
CREATE /*UNIQUE or CLUSTERED*/ INDEX IX_Title ON [Tag] ([Title] DESC) /*Change sort order as needed*/
GO