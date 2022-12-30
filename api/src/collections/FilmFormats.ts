import { CollectionConfig } from 'payload/types';

const FilmFormats: CollectionConfig = {
  slug: 'film-formats',
  admin: {
    group: 'Media',
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

export default FilmFormats;
