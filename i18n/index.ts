import { Translations } from './translations';

const locale = 'de';

// get a translation, fallback to key
// eslint-disable-next-line @typescript-eslint/naming-convention
export const t = (key: string): Record<string, string> => {
  const res: Record<string, string> = {
    en: undefined,
    de: undefined,
  };
  res.de = Translations[key]?.de || key;
  res.en = Translations[key]?.en || key;
  return res;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const _t = (key: string): string => {
  const res = t(key);
  return res[locale];
};
