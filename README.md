<h1 align="center">Welcome to Peppermint Ticket Management 🍵</h1>
<p align="center">
<!--     <img src="./public/logo.svg" alt="Logo" > -->
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.2-blue.svg?cacheSeconds=2592000" />
  <a target="_blank">
    <img alt="Github Stars: " src="https://img.shields.io/github/stars/jwandrews99/winter?style=social" />
  </a>
  <img src="https://img.shields.io/docker/pulls/pepperlabs/peppermint" />
</p>
<p align="center">This project is supported by:</p>
<p align="center">
  <a href="https://www.digitalocean.com/">
    <img src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/SVG/DO_Logo_horizontal_blue.svg" width="201px">
  </a>
</p>

<!-- <p align="center">
  <a href="https://www.buymeacoffee.com/peppermintlabs" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee"          style="height: 15px !important;width: 75px !important;" ></a>
</p>
 -->
> Ticket Management System in order to help helpdesks & service desks manage internal staff &  customer requests

## Installation

Currently only linux has been verified as working but we are open to the idea of supporting windows eventually as well.

Keep in mind, this is an alpha so the risk of data loss is real and it may not be stable, we do not recommend anyone runs this in a production enviroment.

Check out the getting started guide if this is the first time you've used Peppermint: 

```
version: "3.1"

services:
  postgres:
    container_name: postgres
    image: postgres:latest
    restart: always
    volumes:
      - ./docker-data/db:/data/db
    environment: 
      POSTGRES_USER: peppermint
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: peppermint

  client:
    container_name: peppermint
    image: pepperlabs/peppermint
    ports:
      - 5000:5000
    restart: on-failure
    depends_on:
      - postgres
    environment:
      PORT: 5000
      DB_USERNAME: "peppermint"
      DB_PASSWORD: "1234"
      DB_HOST: "postgres"
      BASE_URL: "http://localhost"

```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Peppermint-Lab/Peppermint/issues). 

## Show your support

Give a ⭐️ if this project helped you!

### Setting up postgres on Macos in a container for local development

```
docker run --rm -P -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD="1234" --name pg postgres:alpine
```

## One click installers

- We are now on linode marketplace we can be viewed here <a href="https://www.linode.com/marketplace/apps/peppermint-lab/peppermint/">here</a>

## Supported Environment Variables

You can utilize the following environment variables in Peppermint. None of them are manditory.

| Variable  | Description |
| ------------- | ------------- |
| PUID | Set userid that the container will run as. |
| PGID | Set groupid that the container will run as. |
| DB_USERNAME | Enter database username here |
| DB_PASSWORD | Enter database password here |
| PORT | Choose a custom port to run the app on rather than the default 5000 |


## ✨ Features

- 💡 **Job Logging**
- 📜 **Client History**
- 💎 **Notes creation & Todo List**
- 📐 **Admin Page**: Admin Dashboard for easy webUI changes and analytics
- 📱 **Responsive**: Designed for variable screen sizes from mobile up to 4k
- ⚙️ **Docker-Ready**: Quickly deploy using docker
- ✅ **Usage**: No barriers to use with complete documentation on how to complete tasks

## Roadmap for new features

There is currently a trello roadmap available which is updated daily - https://trello.com/b/tOMsptar/peppermint

## Documentation

We have started working on creating documentation for peppermint which covers development to general usage. Click <a href="https://docs.peppermint.sh">here</a> to be taken directly there.

## Installing locally for development

If you're interested in developing for Peppermint, wether that be a bug fix or locally we have a guide on our <a href="https://docs.peppermint.sh/contributions/">wiki</a>

## Author

👤 **Jack Andrews**

* Website: [peppermint.sh](https://peppermint.sh/) 
* Twitter: [@andrewsjack18 ](https://twitter.com/andrewsjack18 )
* Github: [@potts99](https://github.com/potts99)
* LinkedIn: [@jack-andrews-146852131](https://linkedin.com/in/jack-andrews-146852131)
