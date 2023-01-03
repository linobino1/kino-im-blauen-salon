import { CollectionConfig } from 'payload/types';
import t from '../translations';
import createSlugField from '../fields/slug';

const Movies: CollectionConfig = {
  slug: 'movies',
  admin: {
    group: t('Movies'),
    defaultColumns: ['title', 'director', 'year'],
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
      name: 'mediaUrl',
      type: 'text',
      access: {
        // create: ({ req: { user } }) => { ... },
        read: ({ req: { user } }) => true,
        // update: ({ req: { user } }) => { ... },
        // delete: ({ req: { user } }) => { ... },
        // admin: ({ req: { user } }) => { ... },
      },
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
    {
      name: 'genres',
      label: 'Genre',
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
    },
  ],
};

export default Movies;
