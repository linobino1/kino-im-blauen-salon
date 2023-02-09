import { CollectionConfig } from 'payload/types';
import { Content } from '../blocks/Content';
import { PostsList } from '../blocks/PostsList';
import ScreeningsList from '../blocks/ScreeningsList';
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
      name: 'image',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'layout',
      label: t('Content'),
      type: 'blocks',
      minRows: 1,
      blocks: [
        Content,
        PostsList,
        ScreeningsList,
      ],
    },
    Meta,
  ],
};

export default Pages;
