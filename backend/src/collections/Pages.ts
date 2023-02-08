import { CollectionConfig } from 'payload/types';
import { t } from '../i18n';
import { slugField } from '../util/slugField';
import { addTriggerRevalidation } from '../util/triggerRevalidation';
import { Meta } from './Meta';

export enum PageTypeEnum {
  static = 'static',
  screenings = 'screenings',
  posts = 'posts',
}

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: t('Page'),
    plural: t('Pages'),
  },
  admin: {
    group: t('Site'),
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      addTriggerRevalidation('page', 'slug'),
    ],
  },
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'type',
      label: t('Type'),
      type: 'select',
      required: true,
      options: [
        {
          label: t('Static Page'),
          value: PageTypeEnum.static,
        },
        {
          label: t('Screenings List'),
          value: PageTypeEnum.screenings,
        },
        {
          label: t('Posts List'),
          value: PageTypeEnum.posts,
        },
      ],
      defaultValue: 'static',
    },
    {
      name: 'image',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: t('Content'),
      type: 'richText',
      admin: {
        condition: (data) => data.type === 'static',
      },
    },
    Meta,
  ],
};

export default Pages;
