import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Media } from './collections/Media';
import { Site } from './globals/Site';
import { Navigations } from './collections/Navigations';
import Posts from './collections/Posts';
import Pages from './collections/Pages';
import Users from './collections/Users';

dotenv.config();

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  routes: {
    api: '/payload',
  },
  collections: [
    Users,
    Pages,
    Media,
    Navigations,
    Posts,
  ],
  globals: [
    Site,
  ],
});
