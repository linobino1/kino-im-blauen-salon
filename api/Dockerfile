FROM node:18-alpine as base

FROM base as builder

WORKDIR /home/node
COPY package*.json ./

COPY . .
RUN yarn install --production
RUN yarn build

FROM base as runtime

ENV NODE_ENV=development

WORKDIR /api
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /api/dist ./dist
COPY --from=builder /api/build ./build

EXPOSE 3000

CMD ["node", "src/server.ts"]
