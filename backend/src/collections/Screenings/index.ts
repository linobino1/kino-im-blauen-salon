import { CollectionConfig } from 'payload/types';
import { t, _t } from '../../i18n';
import { slugField } from '../../fields/slugField';

const Screenings: CollectionConfig = {
  slug: 'screenings',
  labels: {
    singular: t('Screening'),
    plural: t('Screenings'),
  },
  admin: {
    group: t('Screenings'),
    defaultColumns: ['date', 'time', 'title', '_status'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'filmprint',
      label: t('Film Print'),
      type: 'relationship',
      relationTo: 'filmPrints',
    },
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
    },
    slugField('title'),
    {
      name: 'date',
      label: t('Date'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'time',
      label: t('Time'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: _t('timeFormatAdmin'),
          timeFormat: _t('timeFormatAdmin'),
        },
      },
    },
    {
      name: 'moderator',
      label: t('Moderator'),
      type: 'text',
      required: false,
    },
    {
      name: 'guest',
      label: t('Guest'),
      type: 'text',
      required: false,
    },
  ],
};

export default Screenings;
