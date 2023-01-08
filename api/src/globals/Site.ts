import { GlobalConfig } from 'payload/types';

const Site: GlobalConfig = {
  slug: 'site',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'homePage',
      type: 'relationship',
      relationTo: 'pages',
    },
    {
      name: 'adress',
      type: 'richText',
    },
  ],
};

export default Site;
