import { CollectionConfig } from 'payload/types';
import { t } from '../../translations';

const Conditions: CollectionConfig = {
  slug: 'conditions',
  labels: {
    singular: t('Condition'),
    plural: t('Conditions'),
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
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Conditions;
