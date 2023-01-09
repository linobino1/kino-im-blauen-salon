import { CollectionConfig } from 'payload/types';
import createSlugField from '../fields/slug';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    group: 'Site',
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    createSlugField('title'),
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Static Page',
          value: 'static',
        },
        {
          label: 'Screenings List',
          value: 'screenings_list',
        },
      ],
      defaultValue: 'static',
    },
    {
      name: 'header',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mainContent',
      type: 'richText',
      admin: {
        condition: (data) => data.type === 'static',
      },
    },
  ],
};

export default Pages;
