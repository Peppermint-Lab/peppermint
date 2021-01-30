<h1 align="center">Welcome to Peppermint Ticket Management 🍵</h1>
<p align="center">
    <img src="./images/logo.png" alt="Logo" >
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/andrewsjack18 " target="_blank">
    <img alt="Twitter:  andrewsjack18" src="https://img.shields.io/twitter/follow/andrewsjack18 .svg?style=social" />
  </a>
  <a target="_blank">
    <img alt="Github Stars: " src="https://img.shields.io/github/stars/jwandrews99/winter?style=social" />
  </a>
</p>

> Ticket Management System in order to help helpdesks & service desks manage internal staff &  customer requests

## ✨ Features

- 💡 **Job Logging**
- 📜 **Client History**
- 💎 **Notes creation & Todo List**:
- 📐 **Admin Page**: Admin Dashboard for easy webUI changes and analytics
- 📱 **Responsive**: Designed for variable screen sizes
- ⚙️ **Docker-Ready**:
- ✅ **Usage**: No barriers to use with complete documentation on how to complete tasks



## Installing locally for development

If you're interested in developing for Peppermint, wether that be a bug fix or locally we have a guide on our <a href="https://pmint.dev/docs/contributions/">wiki</a>

## Docker-Compose

```
version: '3.1'

services:

  mongo:
    container_name: db
    image: mongo:4
    restart: always
    volumes:
    - ./docker-data/db:/data/db

  client:
    container_name: peppermint
    image: pepperlabs/peppermint:latest
    ports:
      - 5000:5000
    restart: on-failure
    depends_on:
      - mongo

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
