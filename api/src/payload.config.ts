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

export default buildConfig({
  serverURL: 'http://127.0.0.1:3000',
  cors: '*',
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

    // media
    Media,

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
