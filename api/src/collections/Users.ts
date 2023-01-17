import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    cookies: {
      domain: process.env.DOMAIN_UI
        ? `${process.env.DOMAIN_UI}`
        : '',
    },
  },
  admin: {
    group: 'Auth',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'insider',
          value: 'insider',
        },
      ],
    },
  ],
  timestamps: true,
};

export default Users;
