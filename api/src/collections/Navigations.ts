import { CollectionConfig } from 'payload/types';

const Navigations: CollectionConfig = {
  slug: 'navigations',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Main',
          value: 'main',
        },
        {
          label: 'Footer',
          value: 'footer',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          unique: true,
        },
      ],
    },
  ],
};

export default Navigations;
