# Use the official Node.js image as the base image
FROM node:18-alpine

RUN apk update
RUN apk add --no-cache bash
RUN apk --no-cache --virtual build-dependencies add make g++ libc6-compat python3

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files for both apps
COPY apps/api/package*.json ./apps/api/
COPY ./ecosystem.config.js ./ecosystem.config.js
COPY apps/client/package*.json ./apps/client/

RUN npm i -g prisma
RUN npm i -g typescript@latest -g --force 


# Copy the source code for both apps
COPY apps/api ./apps/api
COPY apps/client ./apps/client

RUN npm cache clean --force

RUN cd apps/api && npm install --production
RUN cd apps/api && npm i --save-dev @types/node && npm run build

RUN cd apps/client && yarn install --production --ignore-scripts --prefer-offline --network-timeout 1000000
RUN cd apps/client && yarn add --dev typescript @types/node --network-timeout 1000000
RUN cd apps/client && yarn build


# Expose the ports for both apps
EXPOSE 3000 5003

# Install PM2 globally
RUN npm install -g pm2

# Start both apps using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]

