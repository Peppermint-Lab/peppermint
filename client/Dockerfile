FROM node:12-alpine as builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]