FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 443

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY ["PocDemo/PoC.Api.csproj", "PocDemo/"]
COPY ["Poc.Data/Poc.Data.csproj", "Poc.Data/"]
RUN dotnet restore "PocDemo/PoC.Api.csproj"
COPY . .
WORKDIR "/src/PocDemo"
RUN dotnet build "PoC.Api.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "PoC.Api.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENV ASPNETCORE_URLS http://192.168.65.187:5000
ENTRYPOINT ["dotnet", "PoC.Api.dll"]