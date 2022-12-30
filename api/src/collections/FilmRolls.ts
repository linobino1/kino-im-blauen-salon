import { CollectionConfig } from 'payload/types';

const FilmRolls: CollectionConfig = {
  slug: 'film-rolls',
  admin: {
    group: 'Media',
    defaultColumns: ['movie', 'filmFormat'],
    useAsTitle: 'movie.title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'movie',
      type: 'relationship',
      relationTo: 'movies',
    },
    {
      name: 'filmFormat',
      type: 'relationship',
      relationTo: 'film-formats',
    },
    {
      name: 'numActs',
      label: '# Acts',
      type: 'number',
    },
  ],
};

export default FilmRolls;
