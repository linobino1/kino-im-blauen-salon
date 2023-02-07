import { CollectionConfig } from 'payload/types';
import { slugField } from '../../fields/slugField';
import { t, _t } from '../../i18n';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: t('Blog'),
    defaultColumns: ['date', 'title', '_status'],
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const url = (`${process.env.FRONTEND_HOST}/api/revalidate/post?secret=${process.env.REVALIDATION_SECRET}&slug=${doc.slug}`)
        try {
          await fetch(url)
        } catch {}
      }
    ]
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
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'header',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
    },
  ],
};

export default Posts;