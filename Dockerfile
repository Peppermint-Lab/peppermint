FROM node:12-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache add --virtual builds-deps build-base python

RUN npm install

COPY . .

CMD [ "npm run", "server"]