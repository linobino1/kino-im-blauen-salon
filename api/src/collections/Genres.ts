import { CollectionConfig } from 'payload/types';

const Genres: CollectionConfig = {
  slug: 'genres',
  admin: {
    group: 'Movies',
    defaultColumns: ['name'],
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
  ],
};

export default Genres;
