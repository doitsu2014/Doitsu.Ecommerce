FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Doitsu.Fandom.API/Doitsu.Fandom.API.csproj Doitsu.Fandom.API/
COPY Doitsu.Fandom.DbManager/Doitsu.Fandom.DbManager.csproj Doitsu.Fandom.DbManager/
RUN dotnet restore Doitsu.Fandom.API/Doitsu.Fandom.API.csproj
COPY . .
WORKDIR /src/Doitsu.Fandom.API
RUN dotnet build Doitsu.Fandom.API.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Doitsu.Fandom.API.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Doitsu.Fandom.API.dll"]
