use Doitsu_Fandom_Dev

ALTER TABLE [dbo].[Artist]
    ADD [MainBannerUrl] NVARCHAR(MAX);
GO
ALTER TABLE [dbo].[Artist]
    ADD [MainVideoUrl] NVARCHAR(MAX);
GO
ALTER TABLE [dbo].[Artist]
    ADD [MainContent] NVARCHAR(MAX);
GO