import { CollectionConfig } from 'payload/types';

const Directors: CollectionConfig = {
  slug: 'directors',
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
      type: 'text'
    },
    {
      name: 'dateOfBirth',
      label: 'Born',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'dateOfDeath',
      label: 'Died',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    // {
    //   name: 'movies',
    //   type: 'relationship',
    //   relationTo: 'movies',
    //   hasMany: true,
    // },
  ],
};

export default Directors;
