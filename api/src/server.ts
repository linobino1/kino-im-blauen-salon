import dotenv from 'dotenv';
import express from 'express';
import payload from 'payload';
import https from 'https';
import fs from 'fs';
import { InitOptions } from 'payload/config';
import logger from './logger';

logger.level = 'debug';

dotenv.config();

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
const options: InitOptions = {
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
};

// add email service if production
if (process.env.NODE_ENV === 'production' && process.env.EMAIL_FROM_ADDRESS) {
  options.email = {
    fromAddress: process.env.EMAIL_FROM_ADDRESS,
    fromName: process.env.EMAIL_FROM_NAME,
    transportOptions: {
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      port: process.env.SMTP_PORT ?? 587,
      secure: true, // use TLS
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    },
  };
}
payload.init(options);

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
