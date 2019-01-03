FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ./*.csproj Doitsu.Fandom.API/
COPY ./Libs/*.dll Doitsu.Fandom.API/Libs/
RUN dotnet restore Doitsu.Fandom.API/Doitsu.Fandom.API.csproj
COPY . ./
FROM build AS publish
RUN dotnet publish Doitsu.Fandom.API.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Doitsu.Fandom.API.dll"]