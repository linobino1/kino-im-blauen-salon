import { buildConfig } from 'payload/config';
import dotenv from 'dotenv';
import { Media } from './collections/Media';
import { Site } from './globals/Site';
import { Navigations } from './collections/Navigations';
import Posts from './collections/Posts';
import Pages from './collections/Pages';
import Users from './collections/Users';
import Screenings from './collections/Screenings';
import FilmPrints from './collections/FilmPrints';
import AspectRatios from './collections/FilmPrints/AspectRatios';
import Carriers from './collections/FilmPrints/Carriers';
import Conditions from './collections/FilmPrints/Conditions';
import Formats from './collections/FilmPrints/Formats';
import Rightholders from './collections/FilmPrints/Rightholders';
import SoundFormats from './collections/FilmPrints/SoundFormats';
import Movies from './collections/Movies';
import Actors from './collections/Movies/Actors';
import Directors from './collections/Movies/Directors';
import Genres from './collections/Movies/Genres';
import Languages from './collections/Movies/Languages';
import Series from './collections/Movies/Series';
import FilmPrintTypes from './collections/FilmPrints/FilmPrintTypes';
import Countries from './collections/Movies/Countries';

dotenv.config();

export default buildConfig({
  serverURL: `http://${process.env.PAYLOAD_PUBLIC_SERVER_URL}` || 'http://localhost:3000',
  routes: {
    api: '/payload',
  },
  localization: {
    locales: [
      'de',
      'en',
    ],
    defaultLocale: 'en',
  },
  // i18n: {
  //   lng: 'en',
  //   fallbackLng: 'en',
  // },
  collections: [
    // Site
    Users,
    Pages,
    Media,
    Navigations,

    // Blog
    Posts,

    // Screenings
    Screenings,

    // FilmPrints
    FilmPrints,
    FilmPrintTypes,
    AspectRatios,
    Carriers,
    Conditions,
    Formats,
    Rightholders,
    SoundFormats,

    // Movies
    Movies,
    Actors,
    Directors,
    Genres,
    Countries,
    Languages,
    Series,

  ],
  globals: [
    Site,
  ],
});
