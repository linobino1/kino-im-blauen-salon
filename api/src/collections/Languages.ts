import { CollectionConfig } from 'payload/types';

const Languages: CollectionConfig = {
  slug: 'languages',
  admin: {
    group: 'Movies',
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
    },
  ],
};

export default Languages;
