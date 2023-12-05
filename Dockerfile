#  Dockerfile for Node Express Backend

FROM node:18.12.1

# Create App Directory
RUN mkdir -p /usr/src/app-server
WORKDIR /usr/src/app-server

# Install Dependencies
COPY package*.json ./

RUN npm install 

# Copy app source code
COPY . .

# Exports
EXPOSE 4000

CMD ["npm","run","dev"]