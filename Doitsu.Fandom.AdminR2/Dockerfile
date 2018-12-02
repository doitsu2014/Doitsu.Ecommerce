FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj", "Doitsu.Fandom.AdminR2/"]
RUN dotnet restore "Doitsu.Fandom.AdminR2/Doitsu.Fandom.AdminR2.csproj"
COPY . .
WORKDIR "/src/Doitsu.Fandom.AdminR2"
RUN dotnet build "Doitsu.Fandom.AdminR2.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "Doitsu.Fandom.AdminR2.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Doitsu.Fandom.AdminR2.dll"]