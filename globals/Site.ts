import { RichTextElement } from 'payload/dist/fields/config/types';
import { GlobalConfig } from 'payload/types';
import { MediaType } from '../collections/Media';
import { Type as PageType } from '../collections/Pages';
import { t } from '../i18n';

export type Type = {
  favicon?: MediaType
  title: string
  homePage: PageType
  address?: RichTextElement
};

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: (): boolean => true,
  },
  admin: {
    group: t('Site'),
  },
  fields: [
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'homePage',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
    },
    {
      name: 'address',
      label: t('Address'),
      type: 'richText',
    },
  ],
};

export default Site;
