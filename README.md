# Kino Im Blauen Salon

This repository contains the sourcecode for the website of a cinema.  
It consists of a [PayloadCMS](https://payloadcms.com/) backend and a [NextJS](https://nextjs.org/) frontend.  
NextJS communicates with PayloadCMS via GraphQL.

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

:warning:
it is important to run this project on a domain other than localhost!  
NextJS needs to fetch the media from PayloadCMS from server and client by the same URL (otherwise there would be a hydration error). If the project would be run on localhost, the domain doesn't resolve to the PayloadCMS container in the NextJS container.  
Edit your hosts file and make a new entry for 127.0.0.1 that is not localhost and set it in your `.env` file as the hostname.

```
docker compose -f docker-compose.yaml -f docker-compose.development.yaml up -d
```

### Typescript

After changing PayloadCMS collections or globals, their types can be automatically updated by running:

```
cd backend/
yarn generate:types
```

### GraphQL Schema

install the VSCode extension "Apollo GraphQL" to get autocomplete functionality when typing GraphQL queries in the
frontend. Whenever you change the data structure, update the schema like this:

```
cd backend
yarn generate:graphQLSchema
```
and in VSCode command palette: `Apollo: Reload Schema`.  
The Apollo plugin usually dies when two queries have the same name, in this case, rename one of the queries and use
VSCode: `Developer: Reload Window`.

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