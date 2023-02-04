import { ImageLoader } from 'next/image';

/**
 * use this to load files from the /media/ directory
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const mediaLoader: ImageLoader = ({ src, width, quality }): string => (
  `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/media/${src}`
);
