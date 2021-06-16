FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk add --no-cache make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python
  
RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm ci --production && npm cache clean --force
RUN npm install -g mongo-seeding-cli
RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm install -g prisma

# Bundle app source
COPY . .

ENV NODE_ENV=production

EXPOSE 5000
CMD ["npm", "run", "docker"]  
