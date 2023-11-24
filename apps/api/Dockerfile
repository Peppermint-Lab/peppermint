# FROM node:16

# ENV port=8090
# COPY . .

# RUN yarn
# RUN yarn build

# EXPOSE 8090
# CMD [ "node", "./dist/main.js" ]

FROM node:18 AS base

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker


# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install


# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN ls
COPY turbo.json /../../turbo.json

# RUN rm -f apps/api/.env

RUN yarn turbo run build --filter=database

FROM base AS runner
WORKDIR /app

# Don't run production as root
# RUN addgroup --system --gid 1001 prod
# RUN adduser --system --uid 1001 prod
# USER prod
COPY --from=installer /app .

EXPOSE 8090
CMD ["node", "apps/api/dist/"]
