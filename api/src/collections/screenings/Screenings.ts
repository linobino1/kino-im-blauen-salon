import { CollectionConfig } from 'payload/types';
import { addSlugField } from '../../fields/slug';
import logger from '../../logger';
import { t, tLocale } from '../../translations';

const Screenings: CollectionConfig = addSlugField('title', {
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
    read: ({ req }) => {
      // admin -> everything
      if (req.user && req.user.role === 'admin') return true;

      // not logged in or not admin -> only published
      return {
        _status: {
          equals: 'published',
        },
      };
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'filmprint',
      label: t('Film Print'),
      type: 'relationship',
      relationTo: 'filmprints',
      hooks: {
        beforeChange: [
          () => {
            logger.debug('filmprint before change');
          },
        ],
      },
    },
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
    },
    {
      name: 'date',
      label: t('Date'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: tLocale('dateFormatAdmin'),
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
          displayFormat: tLocale('timeFormatAdmin'),
          timeFormat: tLocale('timeFormatAdmin'),
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
});

export default Screenings;
