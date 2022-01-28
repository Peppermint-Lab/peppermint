FROM node:lts-alpine AS deps

RUN mkdir -p /usr/src/app
ENV PORT 5001

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

# ENV YARN_CACHE_FOLDER=/dev/shm/yarn_cache
RUN yarn install --production
RUN yarn add --dev typescript @types/node && yarn add prisma -g

COPY . /usr/src/app

RUN yarn build

EXPOSE 5001

CMD [ "yarn", "run", "docker" ]