# kino-im-blauen-salon

This repository contains a Payload CMS backend and a Vue3 frontend that serve a cinemas website.

## Development Setup

The project needs NodeJS, Yarn and MongoDB to be installed.

```
# start backend
cd api/
yarn install

yarn dev
```

```
# start frontend
cd api/
npm install

npm run dev
```

### Install required software MacOS

```
// NodeJS & Yarn (NodeJS is included in yarn package)
brew install yarn

// MongoDB
brew install mongodb-community

// Install project
cd api/
yarn

// Run development server
yarn dev
```

## Deployment

create a `.env` file like this:

```
PAYLOAD_SECRET=<random-string>
DOMAIN=<your-domain.com>
```

```
docker compose -f docker-compose.yaml -f  docker-compose.production.yaml up 
```
