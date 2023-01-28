import { CollectionConfig } from 'payload/types';
import { t } from '../translations';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: t('Upload'),
    plural: t('Uploads'),
  },
  admin: {
    group: t('Media'),
  },
  access: {
    read: () => true,
  },
  fields: [],
  upload: {
    staticURL: '/media',
    staticDir: process.env.MEDIA_DIR ?? 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        // By specifying `null` or leaving a height undefined,
        // the image will be sized to a certain width,
        // but it will retain its original aspect ratio
        // and calculate a height automatically.
        height: null,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
};

export default Media;
