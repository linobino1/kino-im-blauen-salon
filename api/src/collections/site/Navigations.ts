import { CollectionConfig } from 'payload/types';
import { t } from '../../translations';

const Navigations: CollectionConfig = {
  slug: 'navigations',
  labels: {
    singular: t('Navigation'),
    plural: t('Navigations'),
  },
  admin: {
    group: t('Website'),
    useAsTitle: 'type',
    defaultColumns: ['type'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      label: t('Type'),
      type: 'select',
      options: [
        {
          label: t('Main Navigation'),
          value: 'main',
        },
        {
          label: t('Footer Navigation'),
          value: 'footer',
        },
        {
          label: t('Social Media'),
          value: 'social',
        },
      ],
    },
    {
      name: 'items',
      labels: {
        singular: t('Item'),
        plural: t('Items'),
      },
      type: 'array',
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
          label: t('Type'),
          type: 'radio',
          defaultValue: 'internal',
          options: [
            {
              label: t('Internal Link'),
              value: 'internal',
            },
            {
              label: t('External Link'),
              value: 'external',
            },
            {
              label: t('Subnavigation'),
              value: 'subnavigation',
            },
          ],
        },
        {
          name: 'name',
          label: t('Name'),
          type: 'text',
          required: true,
        },
        // internal link
        {
          name: 'page',
          label: t('Page'),
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
          label: t('Url'),
          type: 'text',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'icon',
          label: t('Icon'),
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'external',
          },
        },
        // subnavigation
        {
          name: 'subnavigation',
          label: t('Subnavigation'),
          type: 'relationship',
          relationTo: 'navigations',
          admin: {
            condition: (data, siblingData) => siblingData.type === 'subnavigation',
          },
        },
      ],
    },
  ],
};

export default Navigations;
