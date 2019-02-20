FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base

WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj Doitsu.Fandom.AdminR2/
RUN dotnet restore Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj
COPY . .

WORKDIR /src/Doitsu.Fandom.AdminR2/ClientApp
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -y build-essential nodejs
CMD ["npm", "install"]

WORKDIR /src/Doitsu.Fandom.AdminR2
RUN dotnet build Doitsu.Fandom.AdminR2.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Doitsu.Fandom.AdminR2.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

ENTRYPOINT ["dotnet", "Doitsu.Fandom.AdminR2.dll"]
