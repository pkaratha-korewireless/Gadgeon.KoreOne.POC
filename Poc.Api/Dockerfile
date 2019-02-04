FROM microsoft/dotnet:2.1-sdk
WORKDIR /app

# copy csproj and restore as distinct layers
WORKDIR /app/data
COPY PoC.Data/*.csproj .
RUN dotnet restore
# copy and build everything else
COPY PoC.Data/ .
RUN dotnet publish -c Release -o out
WORKDIR /app/api
COPY PoCDemo/*.csproj ./
RUN dotnet restore
# copy and build everything else
COPY PoCDemo/ ./
RUN dotnet publish -c Release -o out
EXPOSE 80
ENTRYPOINT ["dotnet", "out/PoC.Api.dll"]	