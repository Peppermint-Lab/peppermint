FROM node:12-alpine as build

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent --production

COPY . /app

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]