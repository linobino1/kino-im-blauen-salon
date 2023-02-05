import { ImageLoader } from 'next/image';

/**
 * use this to load files from the /media/ directory
 */
export const mediaLoader: ImageLoader = ({ src, width, quality }): string => (
  `${process.env.NEXT_PUBLIC_MEDIA_URL || ''}/${src}`
);
