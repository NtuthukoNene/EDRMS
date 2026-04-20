# ── Build stage ──────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy solution file
COPY ["EDRMS.sln", "."]

# Copy all project files (layer-cache friendly — only re-runs restore if .csproj changes)
COPY ["EDRMS.API/EDRMS.API.csproj",                         "EDRMS.API/"]
COPY ["EDRMS.Application/EDRMS.Application.csproj",         "EDRMS.Application/"]
COPY ["EDRMS.Domain/EDRMS.Domain.csproj",                   "EDRMS.Domain/"]
COPY ["EDRMS.Infrastructure/EDRMS.Infrastructure.csproj",   "EDRMS.Infrastructure/"]
COPY ["EDRMS.Persistence/EDRMS.Persistence.csproj",         "EDRMS.Persistence/"]

# Restore dependencies
RUN dotnet restore "EDRMS.API/EDRMS.API.csproj"

# Copy the rest of the source code
COPY . .

# Publish in Release mode
WORKDIR "/src/EDRMS.API"
RUN dotnet publish "EDRMS.API.csproj" -c Release -o /app/publish --no-restore

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Install tools and create non-root user
RUN apt-get update && apt-get install -y passwd \
    && groupadd appgroup && useradd --system --gid appgroup appuser \
    && rm -rf /var/lib/apt/lists/*

# Copy published output from build stage
COPY --from=build /app/publish .

# Give ownership to non-root user
RUN chown -R appuser:appgroup /app
USER appuser

# API listens on 8080 inside the container
# docker-compose maps this to localhost:5000 on your machine
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "EDRMS.API.dll"]
