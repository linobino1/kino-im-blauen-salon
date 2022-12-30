import { CollectionConfig } from 'payload/types';
import t from '../translations';

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
