import { Field } from 'payload/types';
import { t } from '../i18n';

export type Type = {
  description?: string
  keywords?: string
};

export const Meta: Field = {
  name: 'meta',
  label: t('Meta'),
  type: 'group',
  fields: [
    {
      name: 'description',
      label: t('Description'),
      type: 'textarea',
    },
    {
      name: 'keywords',
      label: t('Keywords'),
      type: 'text',
    },
  ],
};
