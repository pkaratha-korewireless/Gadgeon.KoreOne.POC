FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5001/tcp
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["SignalR-Hub/SignalR-Hub.csproj", "SignalR-Hub/"]
RUN dotnet restore "SignalR-Hub/SignalR-Hub.csproj"
COPY . .
WORKDIR "/src/SignalR-Hub"
RUN dotnet build "SignalR-Hub.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "SignalR-Hub.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENV ASPNETCORE_URLS http://*:5001
ENTRYPOINT ["dotnet", "SignalRHub.dll"]