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
        {
          label: 'Social Media',
          value: 'social',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: ({ data }) => data.name,
        },
      },
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            {
              label: 'Internal Link',
              value: 'internal',
            },
            {
              label: 'External Link',
              value: 'external',
            },
            {
              label: 'Submenu',
              value: 'submenu',
            },
          ],
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        // internal link
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'internal',
          },
        },
        // external link
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        // submenu
        {
          name: 'submenu',
          type: 'relationship',
          relationTo: 'navigations',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'submenu',
          },
        },
      ],
    },
  ],
};

export default Navigations;
