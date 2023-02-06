FROM node:18-alpine as base

FROM base as builder

# ARG PAYLOAD_PUBLIC_SERVER_URL
# ENV PAYLOAD_PUBLIC_SERVER_URL=${PAYLOAD_PUBLIC_SERVER_URL}

# ARG PAYLOAD_PUBLIC_CORS
# ENV PAYLOAD_PUBLIC_CORS=${PAYLOAD_PUBLIC_CORS}

WORKDIR /app
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runner

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=/app/dist/payload.config.js

WORKDIR /app
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]
