/**
 * use this to load files from the /media/ directory
 */
export const mediaLoader = ({ src, width, quality }) => (
  `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/media/${src}?w=${width}&q=${quality || 75}`
);
