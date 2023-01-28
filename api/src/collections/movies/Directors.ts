import { CollectionConfig } from 'payload/types';
import { t, tLocale } from '../../translations';

const Directors: CollectionConfig = {
  slug: 'directors',
  labels: {
    singular: t('Director'),
    plural: t('Directors'),
  },
  admin: {
    group: t('Movies'),
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
      required: true,
    },
    {
      name: 'dateOfBirth',
      label: t('Born'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: tLocale('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'dateOfDeath',
      label: t('Died'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: tLocale('dateFormatAdmin'),
        },
      },
    },
  ],
};

export default Directors;
