import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Movies from './collections/Movies';
import Directors from './collections/Directors';
import Genres from './collections/Genres';
import Languages from './collections/Languages';
import Screenings from './collections/Screenings';
import FilmRolls from './collections/FilmRolls';
import FilmFormats from './collections/FilmFormats';
import Media from './collections/Media';
import Site from './globals/Site';
import Pages from './collections/Pages';
import Navigations from './collections/Navigations';
import Posts from './collections/Posts';

export default buildConfig({
  serverURL: 'https://127.0.0.1:3000',
  cors: [
    'https://127.0.0.1:5173',
    'https://localhost:5173',
  ],
  csrf: [
    'https://127.0.0.1:5173',
    'https://localhost:5173',
  ],
  admin: {
    user: Users.slug,
  },
  collections: [
    // auth
    Users,

    // movies
    Movies,
    Directors,
    Genres,
    Languages,

    // film copies
    FilmRolls,
    FilmFormats,

    // screenings
    Screenings,

    // blog
    Posts,

    // media
    Media,

    // site
    Pages,
    Navigations,
  ],
  globals: [
    // site
    Site,
  ],
  localization: {
    locales: [
      'en',
      'de',
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  i18n: {
    resources: {
      en: {
        dateFormatAdmin: 'yyyy-MM-dd',
      },
    },
  },
});
