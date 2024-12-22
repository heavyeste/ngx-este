FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# Install NodeJs
RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_18.x | bash - && \
apt-get install -y build-essential nodejs
# End Install

WORKDIR /src
#COPY ["LgcDev.csproj", "LgcDev/"]

#WORKDIR "/src/LgcDev"
COPY . .

RUN npm run build
