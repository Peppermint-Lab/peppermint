<h1 align="center">Welcome to Peppermint Ticket Management 🍵</h1>
<p align="center">
    <img src="./images/logo.png" alt="Logo" >
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.5-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/andrewsjack18 " target="_blank">
    <img alt="Twitter:  andrewsjack18" src="https://img.shields.io/twitter/follow/andrewsjack18 .svg?style=social" />
  </a>
  <a target="_blank">
    <img alt="Github Stars: " src="https://img.shields.io/github/stars/jwandrews99/winter?style=social" />
  </a>
  <img src="https://img.shields.io/docker/pulls/pepperlabs/peppermint" />
</p>

> Ticket Management System in order to help helpdesks & service desks manage internal staff &  customer requests

##  💻 Demo

If you're interested in trying out Peppermint we currently have a demo working <a href="https://demo.pmint.dev/">here.</a>

The credentials are 
```
email: admin@admin.com
password: 1234
```

## ✨ Features

- 💡 **Job Logging**
- 📜 **Client History**
- 💎 **Notes creation & Todo List**
- 📐 **Admin Page**: Admin Dashboard for easy webUI changes and analytics
- 📱 **Responsive**: Designed for variable screen sizes from mobile up to 4k
- ⚙️ **Docker-Ready**: Quickly deploy using docker
- ✅ **Usage**: No barriers to use with complete documentation on how to complete tasks

## Roadmap

There is currently a trello roadmap available which is updated daily - https://trello.com/b/tOMsptar/peppermint

## Documentation

We have started working on creating documentation for peppermint which covers development to general usage. Click <a href="https://pmint.dev/docs/gettingStarted">here</a> to be taken directly there.

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

* Website: [pmint.dev](https://pmint.dev/) 
* Twitter: [@andrewsjack18 ](https://twitter.com/andrewsjack18 )
* Github: [@potts99](https://github.com/jwandrews99)
* LinkedIn: [@jack-andrews-146852131](https://linkedin.com/in/jack-andrews-146852131)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/jwandrews99/winter/issues). 

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Jack Andrews](https://github.com/jwandrews99).<br />
