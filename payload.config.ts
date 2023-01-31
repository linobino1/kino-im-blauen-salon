import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Page } from './collections/Page';
import { Media } from './collections/Media';
import { Site } from './globals/Site';
import { Navigations } from './collections/Navigations';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Page,
    Media,
    Navigations,
  ],
  globals: [
    Site,
  ],
});
