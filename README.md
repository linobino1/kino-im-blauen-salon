# Kino Im Blauen Salon

This repository contains the sourcecode for the website of a cinema.  
It consists of a [PayloadCMS](https://payloadcms.com/) backend and a [NextJS](https://nextjs.org/) frontend. NextJS communicates with PayloadCMS via the local API.

## Setup

create `.env` like `.env.template`. 

### Yarn

install dependencies:
```
yarn
```

spin up dev server:
```
yarn dev
```

### Docker

```
docker compose -f docker-compose.yaml -f docker-compose.development.yaml up -d
```

### Typescript

After changing PayloadCMS collections or globals, their types can be automatically updated by running:

```
yarn generate:types
```

## Deployment

create `.env` like `.env.template`, fill in your domain, fresh secrets, a timezone used for formatting the
times on the website, and an admin email adress for the letsencrypt process.

```
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up -d

# should there be an error, try spinning up the db container first:
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up -d db
```

## Migration

### MongoDB

```
# upload the mongo dump into ./dump ... maybe with iTerm2 util ...

# terminal in the mongo container
docker exec -it db sh

# app in dump/app is the name of the dumped database
mongorestore --db app dump/app
```

### Media

*TODO*