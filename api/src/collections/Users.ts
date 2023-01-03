import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  // auth: {
  //   cookies: {
  //     // domain: 'http://127.0.0.1:5173',
  //     secure: false,
  //     sameSite: 'lax',
  //   },
  // },
  admin: {
    group: 'Auth',
    useAsTitle: 'name',
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
