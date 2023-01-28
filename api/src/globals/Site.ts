import { GlobalConfig } from 'payload/types';
import { t } from '../translations';

const Site: GlobalConfig = {
  slug: 'site',
  admin: {
    group: t('Website'),
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'favicon',
      label: t('Site Icon'),
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
    },
    {
      name: 'homePage',
      label: t('Home Page'),
      type: 'relationship',
      relationTo: 'pages',
    },
    {
      name: 'address',
      label: t('Address'),
      type: 'richText',
    },
  ],
};

export default Site;
