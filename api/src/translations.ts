const Translations: { [key: string]: { en: string, de: string } } = {
  Movie: {
    de: 'Film',
    en: 'Movie',
  },
  Movies: {
    de: 'Filme',
    en: 'Movies',
  },
  Title: {
    de: 'Titel',
    en: 'Title',
  },
  'Header Image': {
    de: 'Titelbild',
    en: 'Header Image',
  },
  Director: {
    de: 'Regisseur',
    en: 'Director',
  },
  'Publication Year': {
    de: 'Jahr der Veröffentlichung',
    en: 'Publication Year',
  },
  dateFormatAdmin: {
    de: 'MM.dd.yyyy',
    en: 'yyyy-MM-dd',
  },
};

const t = (key: string): Record<string, string> => Translations[key];

export default t;
