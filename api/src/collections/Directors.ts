import { CollectionConfig } from 'payload/types';

const Directors: CollectionConfig = {
  slug: 'directors',
  admin: {
    group: 'Movies',
    defaultColumns: ['name', 'movies'],
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
    // {
    //   name: 'movies',
    //   type: 'relationship',
    //   relationTo: 'movies',
    //   hasMany: true,
    // },
  ]
}

export default Directors;