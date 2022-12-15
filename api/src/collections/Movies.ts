import { CollectionConfig } from 'payload/types';

const Posts: CollectionConfig = {
  slug: 'movies',
  admin: {
    group: 'Movies',
    defaultColumns: ['title', 'director', 'year'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'director',
      type: 'relationship',
      relationTo: 'directors',
      hasMany: false,
    },
    {
      name: 'year',
      label: 'Publication Year',
      type: 'number',
    },
  ]
}

export default Posts;