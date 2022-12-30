const Translations: { [key: string]: { en: string, de: string } } = {
  Movies: {
    de: 'Filme',
    en: 'Movies',
  },
  dateFormatAdmin: {
    de: 'MM.dd.yyyy',
    en: 'yyyy-MM-dd',
  },
};

const t = (key: string): Record<string, string> => Translations[key];

export default t;
