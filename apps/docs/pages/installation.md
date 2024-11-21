# How To Install

# 1. Spearmint Installer

**Spearmint**, is a tool designed to simplify your setup process to install peppermint.


[Spearmint](https://spearmint.sh/) is a streamlined installer created by the talented developer [Sydney](https://syd.gg/). This tool is built with being user-friendly in mind and aims to make installations more accessible to people and businesses everywhere.

> **Note:** The Spearmint installer may occasionally be out of date or experience some issues. While **Peppermint** supports and endorses this tool, we cannot guarantee its full functionality or safety. Use it at your own discretion, and remember to exercise caution during installation.


# 2. Docker Install

Requirements:

- Docker
- Docker Compose

```docker
version: "3.1"

services:
  peppermint_postgres:
    container_name: peppermint_postgres
    image: postgres:latest
    restart: always
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: peppermint
      POSTGRES_PASSWORD: 1234
      POSTGRES_DB: peppermint

  peppermint:
    container_name: peppermint
    image: pepperlabs/peppermint:latest
    ports:
      - 3000:3000
      - 5003:5003
    restart: always
    depends_on:
      - peppermint_postgres
    environment:
      DB_USERNAME: "peppermint"
      DB_PASSWORD: "1234"
      DB_HOST: "peppermint_postgres"
      SECRET: 'peppermint4life'

volumes:
 pgdata:
```

After you have created the docker-compose.yml file, run the following command:

```bash
docker-compose up -d
```

Then you can access the application at http://your-server-ip:3000

The default login credentials for the admin account are:

```
admin@admin.com
1234
```


Hey! Are you helping **Develop** on the [GitHub?](https://github.com/Peppermint-Lab/peppermint/) Please Refer to [This!](https://docs.peppermint.sh/development/)

