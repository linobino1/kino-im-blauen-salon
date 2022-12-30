import { CollectionConfig } from 'payload/types';

const Screenings: CollectionConfig = {
  slug: 'screenings',
  admin: {
    group: 'Screenings',
    defaultColumns: ['date', 'time', 'title'],
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
      name: 'date',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MM.dd.yyyy',
        },
      },
    },
    {
      name: 'time',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'HH:mm',
        },
      },
    },
    {
      name: 'media',
      type: 'relationship',
      relationTo: 'film-rolls',
    },
  ],
};

export default Screenings;
