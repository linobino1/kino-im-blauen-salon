import { CollectionConfig } from 'payload/types';

const SocialLinks: CollectionConfig = {
  slug: 'socialLinks',
  admin: {
    group: 'Site',
    useAsTitle: 'name',
    defaultColumns: ['name', 'url'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default SocialLinks;
