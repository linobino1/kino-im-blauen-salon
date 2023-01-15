# kino-im-blauen-salon

This repository contains a Payload CMS backend and a Vue3 frontend that serve a cinemas website.

## Development Setup

### Using Docker

Most comfortably spin up the project with docker compose. The frontend will work with vite and the backend with nodemon
for quick reload. 

```
docker-compose -f docker-compose.yaml -f docker-compose.development.yaml up

# wait until everything is installed...
```

### Manually

You will need NodeJS, Yarn and MongoDB to be installed.

#### Install required software MacOS

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

#### Backend

```
export PAYLOAD_SECRET=secret123
export MONGODB_URI=mongodb://localhost/payload

cd api/

yarn install

yarn dev
```

#### Frontend

```
# start frontend
cd ui/
npm install

npm run dev
```


## Deployment

### Concept

- ui: served by nginx on internal port 80
- api: served by NodeJS/Express
- certbot: needs to be run once on setup to generate a certificate for the domain. A cron job will be setup for the renewal
- nginx: reverse proxy to ui and api using the certificate

create a `.env` file like this:

```
PAYLOAD_SECRET=<random-string>
DOMAIN=<your-domain.com>
```

```
docker compose -f docker-compose.yaml -f  docker-compose.production.yaml up 
```
