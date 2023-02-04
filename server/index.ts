/* eslint-disable no-console */
import path from 'path';
import next from 'next';
import express from 'express';
import payload from 'payload';
import { config as dotenv } from 'dotenv';

dotenv({
  path: path.resolve(__dirname, '../.env'),
});

const dev = process.env.NODE_ENV !== 'production';
const server = express();

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGO_URL,
    express: server,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  }).catch((e) => {
    console.log('payloadInit() failed:');
    console.log(e);
  });

  const nextApp = next({ dev });

  const nextHandler = nextApp.getRequestHandler();

  server.get('*', (req, res) => nextHandler(req, res));
  server.post('*', (req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    console.log('NextJS started');

    server.listen(process.env.PORT, async () => {
      console.log(`Server listening on ${process.env.PORT}...`);
    });
  });
};

start();
