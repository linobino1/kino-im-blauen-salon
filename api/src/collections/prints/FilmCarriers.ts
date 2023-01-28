import { CollectionConfig } from 'payload/types';
import { t } from '../../translations';
import analogueDigitalTypeField from './fields';

const FilmCarriers: CollectionConfig = {
  slug: 'filmCarriers',
  labels: {
    singular: t('Film Carrier'),
    plural: t('Film Carriers'),
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

export default FilmCarriers;
