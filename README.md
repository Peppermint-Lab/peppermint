<h1 align="center">Welcome to Winter 👋 - Still in Alpha</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.2-blue.svg?cacheSeconds=2592000" />
  <a href="https://choosealicense.com/licenses/apache-2.0/" target="_blank">
    <img alt="License: apache--2.0" src="https://img.shields.io/badge/License-apache--2.0-yellow.svg" />
  </a>
  <a href="https://twitter.com/andrewsjack18 " target="_blank">
    <img alt="Twitter:  andrewsjack18" src="https://img.shields.io/twitter/follow/andrewsjack18 .svg?style=social" />
  </a>
  <a target="_blank">
    <img alt="Github Stars: " src="https://img.shields.io/github/stars/jwandrews99/winter?style=social" />
  </a>
</p>

> Ticket Management System in order to help helpdesks & service desks manage internal staff &  customer requests

## Installing locally for development

```sh
git clone https://github.com/jwandrews99/winter.git
cd winter

npm install
cd client && npm install
```

## Usage from the root folder

- npm run dev - runs both the client and the server at the same using concurrently
- npm run client - runs the react client on its own
- npm run server - runs the node server on its own

```sh
npm run dev 
npm run client
npm run server

```

## Docker-Compose

```
version: '3.1'

services:

  mongo:
    container_name: api-db
    image: mongo:4
    restart: always
    volumes:
    - ./docker-data/db:/data/db

  api:
    container_name: api
    image: winter-api:latest
    ports:
      - 5000:5000
    restart: on-failure
    volumes:
      - ./:/usr/src/app:cached
      - npm_cache:/root/.npm:delegated
      - node_modules:/usr/src/app/node_modules:delegated
    depends_on:
      - mongo

  client:
    image: winter-latest:client
    ports:
    - "80:80"
    container_name: client

volumes:
  npm_cache:
  node_modules:
```

## Author

👤 **Jack Andrews**

* Website:  
* Twitter: [@andrewsjack18 ](https://twitter.com/andrewsjack18 )
* Github: [@jwandrews99](https://github.com/jwandrews99)
* LinkedIn: [@jack-andrews-146852131](https://linkedin.com/in/jack-andrews-146852131)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jwandrews99/winter/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Jack Andrews](https://github.com/jwandrews99).<br />
This project is [apache--2.0](https://choosealicense.com/licenses/apache-2.0/) licensed.
