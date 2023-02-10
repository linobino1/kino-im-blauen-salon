import { Media } from '@/payload-types';


export const mediaUrl = (image: Media): string => (
  `${process.env.NEXT_PUBLIC_HOST_BACKEND || 'http://localhost:3000'}/media/${image.filename}`
);
