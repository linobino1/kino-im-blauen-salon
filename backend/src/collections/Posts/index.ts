import { CollectionConfig } from 'payload/types';
import { slugField } from '../../util/slugField';
import { t, _t } from '../../i18n';
import { addTriggerRevalidation } from '../../util/triggerRevalidation';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: t('Blog'),
    defaultColumns: ['date', 'title', '_status'],
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [
      addTriggerRevalidation('post', 'slug')
    ],
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
