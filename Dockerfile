FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent --production
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

CMD [ "node", "server.js" ]