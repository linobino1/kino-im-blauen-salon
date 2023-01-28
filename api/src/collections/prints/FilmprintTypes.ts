import { CollectionConfig } from 'payload/types';
import { t } from '../../translations';

const FilmprintTypes: CollectionConfig = {
  slug: 'filmprintTypes',
  labels: {
    singular: t('Filmprint Type'),
    plural: t('Filmprint Types'),
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
    {
      name: 'name',
      label: t('name'),
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default FilmprintTypes;
