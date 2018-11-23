#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see http://aka.ms/containercompat 

FROM microsoft/dotnet:2.1-aspnetcore-runtime-nanoserver-1803 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk-nanoserver-1803 AS build
WORKDIR /src
COPY Doitsu.Fandom.API/Doitsu.Fandom.API.csproj Doitsu.Fandom.API/
COPY ../DoitsuService/DoitsuService/Doitsu.DBManager/Doitsu.DBManager.csproj ../DoitsuService/DoitsuService/Doitsu.DBManager/
COPY ../DoitsuService/DoitsuService/Utils/Doitsu.Utils.csproj ../DoitsuService/DoitsuService/Utils/
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
