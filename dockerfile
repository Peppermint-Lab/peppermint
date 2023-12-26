FROM node:lts AS builder

# Set the working directory inside the container
WORKDIR /app

RUN apt-get update && \
    apt-get install -y build-essential python3

# Copy the package.json and package-lock.json files for both apps
COPY apps/api/package*.json ./apps/api/
COPY apps/client/package*.json ./apps/client/
COPY ./ecosystem.config.js ./ecosystem.config.js

RUN npm i -g prisma
RUN npm i -g typescript@latest -g --force 

# Copy the source code for both apps
COPY apps/api ./apps/api
COPY apps/client ./apps/client

RUN cd apps/api && npm install --production
RUN cd apps/api && npm i --save-dev @types/node && npm run build

RUN cd apps/client && yarn install --production --ignore-scripts --prefer-offline --network-timeout 1000000
RUN cd apps/client && yarn add --dev typescript @types/node --network-timeout 1000000
RUN cd apps/client && yarn build

FROM node:lts AS runner

COPY --from=builder /app/apps/api/ ./apps/api/
COPY --from=builder /app/apps/client ./apps/client
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

# Expose the ports for both apps
EXPOSE 3000 5003

# Install PM2 globally
RUN npm install -g pm2

# Start both apps using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]

