import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
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
    }
  ],
  // timestamps: true,
};

export default Users;