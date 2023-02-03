# Kino Im Blauen Salon

This repository contains the sourcecode for the website of a cinema.  
It consists of a [PayloadCMS](https://payloadcms.com/) backend and a [NextJS](https://nextjs.org/) frontend. NextJS communicates with PayloadCMS via the local API.

## Setup

create `.env` like `.env.template`.

install dependencies:
```
yarn
```

spin up dev server:
```
yarn dev
```

Or use `docker-compose`:

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

create `.env` like `.env.template`, fill in your domain, fresh secrets, PORT=80 and a timezone used for formatting the
times on the website.

```
docker compose -f docker-compose.yaml -f docker-compose.production.yaml up -d
```