FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Doitsu.Fandom.Client_Homepage/Doitsu.Fandom.Client_Homepage.csproj Doitsu.Fandom.Client_Homepage/
RUN dotnet restore Doitsu.Fandom.Client_Homepage/Doitsu.Fandom.Client_Homepage.csproj
COPY . .
WORKDIR /src/Doitsu.Fandom.Client_Homepage
RUN dotnet build Doitsu.Fandom.Client_Homepage.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Doitsu.Fandom.Client_Homepage.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Doitsu.Fandom.Client_Homepage.dll"]
