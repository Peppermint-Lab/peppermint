FROM node:14 AS deps

RUN apt-get update && apt-get install -y libc6-dev

# Copy over ONLY the package.json and yarn.lock
# so that this `yarn install` layer is only recomputed
# if these dependency files change. Nice speed hack!
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Now we make a container to handle our Build
FROM node:14 AS BUILD_IMAGE

# Set up our work directory again
WORKDIR /app

# Bring over the deps we installed and now also
# the rest of the source code to build the Next
# server for production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Remove all the development dependencies since we don't
# need them to run the actual server.
RUN rm -rf node_modules
RUN yarn install --production --frozen-lockfile --ignore-scripts --prefer-offline
RUN yarn remove bcrypt && yarn add bcrypt
RUN yarn add --dev typescript @types/node --network-timeout 1000000 && yarn add prisma -g --network-timeout 1000000


FROM node:14

RUN apt-get update && apt-get install -y bash

RUN addgroup --gid 1001 nodejs
RUN adduser --disabled-password --gecos '' --uid 1001 --gid 1001 nextjs

WORKDIR /app
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/package.json /app/yarn.lock ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/public ./public
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.next ./.next
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/start.sh ./
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/.env ./

COPY --from=BUILD_IMAGE --chown=nextjs:nodejs /app/next.config.js  ./

ENV NODE_ENV production
ENV PORT 5001
EXPOSE 5001

CMD bash -C './start.sh';'bash'
