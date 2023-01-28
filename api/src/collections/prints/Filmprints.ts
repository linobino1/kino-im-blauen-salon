import payload from 'payload';
import { CollectionConfig } from 'payload/types';
import { addSlugField } from '../../fields/slug';
import { t } from '../../translations';
import analogueDigitalTypeField from './fields';

const Filmprints: CollectionConfig = addSlugField('title', {
  slug: 'filmprints',
  labels: {
    singular: t('Film Print'),
    plural: t('Film Prints'),
  },
  admin: {
    group: t('Film Prints'),
    defaultColumns: ['movie', 'filmFormat'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (!data?.movie || !data?.format) return data;

        // create title from movie & format
        const movie = await payload.findByID({
          collection: 'movies',
          id: data.movie,
        });
        const format = await payload.findByID({
          collection: 'filmFormats',
          id: data.format,
        });
        const res = data;
        res.title = `${movie.originalTitle} ${format.name}`;
        return res;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'movie',
      label: t('Movie'),
      type: 'relationship',
      relationTo: 'movies',
    },
    analogueDigitalTypeField('type'),
    {
      name: 'filmprintType',
      label: t('Filmprint Type'),
      type: 'relationship',
      relationTo: 'filmprintTypes',
      required: true,
    },
    {
      name: 'duration',
      label: t('Playing Time'),
      type: 'number',
      min: 0,
      admin: {
        description: t('Duration in minutes'),
      },
      required: true,
    },
    {
      type: 'collapsible',
      label: t('Language'),
      fields: [
        {
          name: 'language',
          label: t('Language Version'),
          type: 'relationship',
          relationTo: 'languages',
          required: true,
        },
        {
          name: 'isOriginalLanguage',
          label: t('Original Language'),
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'subtitles',
          label: t('Subtitles'),
          type: 'relationship',
          relationTo: 'languages',
          required: false,
        },
      ],
    },
    {
      type: 'collapsible',
      label: t('Format'),
      fields: [
        {
          name: 'format',
          label: t('Film Format'),
          type: 'relationship',
          relationTo: 'filmFormats',
          required: true,
          filterOptions: ({ data }) => (
            { type: { equals: data?.type } }
          ),
        },
        {
          name: 'carrier',
          label: t('Carrier'),
          type: 'relationship',
          relationTo: 'filmCarriers',
          filterOptions: () => ({ type: { equals: 'analogue' } }),
          required: true,
        },
        {
          name: 'numActs',
          label: t('Number of Acts'),
          type: 'number',
          admin: {
            condition: (data) => data?.type === 'analogue',
          },
          required: true,
        },
        {
          name: 'aspectRatio',
          label: t('Aspect Ration'),
          type: 'relationship',
          relationTo: 'aspectRatios',
          required: true,
        },
        {
          name: 'soundFormat',
          label: t('Sound Format'),
          type: 'relationship',
          relationTo: 'soundFormats',
          required: true,
        },
        {
          name: 'condition',
          label: t('Condition'),
          type: 'relationship',
          relationTo: 'conditions',
          admin: {
            condition: (data) => data?.type === 'analogue',
          },
          required: true,
        },
      ],
    },
    {
      name: 'rightholder',
      label: t('Rights Holder'),
      type: 'text',
      required: true,
    },
  ],
});

export default Filmprints;
