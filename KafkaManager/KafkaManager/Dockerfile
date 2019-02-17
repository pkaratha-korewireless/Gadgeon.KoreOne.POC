FROM microsoft/dotnet:2.1-runtime AS base
WORKDIR /app

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY KafkaManager/KafkaManager.csproj KafkaManager/
RUN dotnet restore KafkaManager/KafkaManager.csproj
COPY . .
WORKDIR /src/KafkaManager
RUN dotnet build KafkaManager.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish KafkaManager.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "KafkaManager.dll"]
