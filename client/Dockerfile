FROM node:12-alpine as builder

WORKDIR /app

COPY package.json /app/package.json

RUN npm install --silent --production

COPY . /app

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx.html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]