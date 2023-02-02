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

### Typescript

After changing PayloadCMS collections or globals, their types can be automatically updated by running:

```
yarn generate:types
```