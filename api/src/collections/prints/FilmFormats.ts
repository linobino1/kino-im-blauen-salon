import { CollectionConfig } from 'payload/types';
import { t } from '../../translations';
import analogueDigitalTypeField from './fields';

const FilmFormats: CollectionConfig = {
  slug: 'filmFormats',
  labels: {
    singular: t('Film Format'),
    plural: t('Film Formats'),
  },
  admin: {
    group: t('Film Prints'),
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    analogueDigitalTypeField('type'),
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default FilmFormats;
