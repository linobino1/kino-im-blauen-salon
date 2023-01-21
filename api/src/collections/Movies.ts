import { CollectionConfig } from 'payload/types';
import t from '../translations';
import createSlugField from '../fields/slug';

const Movies: CollectionConfig = {
  slug: 'movies',
  labels: {
    singular: t('Movie'),
    plural: t('Movies'),
  },
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
      label: t('Title'),
      type: 'text',
    },
    {
      name: 'header',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
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
      label: t('Director'),
      type: 'relationship',
      relationTo: 'directors',
      hasMany: false,
    },
    {
      name: 'year',
      label: t('Publication Year'),
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
