import { CollectionConfig } from 'payload/types';
import { addSlugField } from '../../fields/slug';
import { tLocale } from '../../translations';

const Posts: CollectionConfig = addSlugField('title', {
  slug: 'posts',
  admin: {
    group: 'Blog',
    defaultColumns: ['date', 'title', '_status'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: tLocale('dateFormatAdmin'),
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
});

export default Posts;