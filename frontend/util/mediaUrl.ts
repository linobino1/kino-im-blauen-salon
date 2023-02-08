import { Media } from '@/payload-types';


export const mediaUrl = (image: Media): string => `${process.env.NEXT_PUBLIC_MEDIA_URL}/${image.filename}`;
