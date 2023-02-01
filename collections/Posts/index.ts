import { RichTextElement } from 'payload/dist/fields/config/types';
import { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';
import { slugField } from '../../utilities/slugField';
import { MediaType } from '../Media';

export type Type = {
  title: string
  slug: string
  date: string
  header: MediaType
  content: RichTextElement
  link: string
};

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: t('Blog'),
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
    slugField('title'),
    {
      name: 'date',
      type: 'date',
      required: true,
      defaultValue: Date(),
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          // displayFormat: tLocale('dateFormatAdmin'),
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
