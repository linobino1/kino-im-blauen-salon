import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/site/Users';
import Movies from './collections/movies/Movies';
import Directors from './collections/movies/Directors';
import Genres from './collections/movies/Genres';
import Languages from './collections/movies/Languages';
import Screenings from './collections/screenings/Screenings';
import FilmFormats from './collections/prints/FilmFormats';
import Media from './collections/Media';
import Site from './globals/Site';
import Pages from './collections/site/Pages';
import Navigations from './collections/site/Navigations';
import Posts from './collections/blog/Posts';
import Countries from './collections/movies/Countries';
import Filmprints from './collections/prints/Filmprints';
import FilmCarriers from './collections/prints/FilmCarriers';
import AspectRatios from './collections/prints/AspectRatios';
import SoundFormats from './collections/prints/SoundFormats';
import Conditions from './collections/prints/Conditions';
import Rightholders from './collections/prints/Rightholders';
import FilmprintTypes from './collections/prints/FilmprintTypes';
import FilmSeries from './collections/movies/FilmSeries';
import Actors from './collections/movies/Actors';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_HOST_API || 'https://localhost:3000',
  cors: [
    process.env.PAYLOAD_PUBLIC_HOST_UI || 'https://localhost:5173',
  ],
  csrf: [
    process.env.PAYLOAD_PUBLIC_HOST_UI || 'https://localhost:5173',
  ],
  admin: {
    user: Users.slug,
    dateFormat: 'dd.MM.yyyy',
  },
  collections: [
    // screenings
    Screenings,

    // blog
    Posts,

    // movies
    Movies,
    Directors,
    Actors,
    Genres,
    Languages,
    Countries,
    FilmSeries,

    // film prints
    Filmprints,
    FilmprintTypes,
    FilmCarriers,
    FilmFormats,
    AspectRatios,
    SoundFormats,
    Conditions,
    Rightholders,

    // media
    Media,

    // site
    Users,
    Pages,
    Navigations,
  ],
  globals: [
    // site
    Site,
  ],
  localization: {
    locales: [
      // 'en',
      'de',
    ],
    defaultLocale: 'de',
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
      de: {
        dateFormatAdmin: 'dd.MM.yyyy',
      },
      en: {
        dateFormatAdmin: 'yyyy-MM-dd',
      },
    },
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
});
