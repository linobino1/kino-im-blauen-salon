import { CollectionConfig } from 'payload/types';

const Navigations: CollectionConfig = {
  slug: 'navigations',
  admin: {
    group: 'Site',
    useAsTitle: 'type',
    defaultColumns: ['type'],
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
    // Footer specific
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'relationship',
          relationTo: 'socialLinks',
        },
      ],
      admin: {
        condition: (data) => data.type === 'footer',
      },
    },
    {
      name: 'adress',
      type: 'richText',
      admin: {
        condition: (data) => data.type === 'footer',
      },
    },
  ],
};

export default Navigations;
