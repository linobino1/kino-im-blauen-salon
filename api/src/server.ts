import 'dotenv/config';
import express from 'express';
import payload from 'payload';
import https from 'https';
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import _unused from './env';
import logger from './logger';

logger.level = 'debug';

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

// Add your own express routes here

if (process.env.NODE_ENV === 'development') {
  const httpsServer = https.createServer({
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem'),
    passphrase: 'linobino1',
  }, app);

  httpsServer.listen(3000);
} else {
  app.listen(3000);
}
