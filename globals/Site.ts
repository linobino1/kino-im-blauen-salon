import { GlobalConfig } from 'payload/types';
import { MediaType } from '../collections/Media';
import { Type as PageType } from '../collections/Page';

export type Type = {
  favicon?: MediaType
  title: string
  homePage: PageType
};

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: (): boolean => true,
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
    },
  ],
};

export default Site;
