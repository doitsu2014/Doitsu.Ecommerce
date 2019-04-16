FROM mhart/alpine-node:10 as build-node
WORKDIR /ClientApp
COPY Doitsu.Fandom.AdminR2/ClientApp/package.json .
COPY Doitsu.Fandom.AdminR2/ClientApp/package-lock.json .
RUN npm install
COPY Doitsu.Fandom.AdminR2/ClientApp/ .
RUN npm run build

FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj Doitsu.Fandom.AdminR2/
RUN dotnet restore Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj
COPY . .
WORKDIR /src/Doitsu.Fandom.AdminR2
RUN dotnet build Doitsu.Fandom.AdminR2.csproj -c Release -o /app
FROM build AS publish
ENV BuildingDocker true
RUN dotnet publish Doitsu.Fandom.AdminR2.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
COPY --from=build-node /ClientApp/build ./ClientApp/build

ENTRYPOINT ["dotnet", "Doitsu.Fandom.AdminR2.dll"]
