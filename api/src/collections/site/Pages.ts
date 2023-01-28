import { CollectionConfig } from 'payload/types';
import { addSlugField } from '../../fields/slug';
import { t } from '../../translations';

const Pages: CollectionConfig = addSlugField('title', {
  slug: 'pages',
  labels: {
    singular: t('Page'),
    plural: t('Pages'),
  },
  admin: {
    group: t('Website'),
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
    },
    {
      name: 'type',
      label: t('Type'),
      type: 'select',
      options: [
        {
          label: t('Static Page'),
          value: 'static',
        },
        {
          label: t('Screenings List'),
          value: 'screenings_list',
        },
        {
          label: t('Blog'),
          value: 'posts_list',
        },
      ],
      defaultValue: 'static',
    },
    {
      name: 'header',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mainContent',
      label: t('Main Content'),
      type: 'richText',
      admin: {
        condition: (data) => data.type === 'static',
      },
    },
  ],
});

export default Pages;
