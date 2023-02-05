import React from 'react';
import { Media } from '@/payload-types';
import { mediaLoader } from '@/util/mediaLoader';

type Props = {
  favicon?: Media
};

export const Favicon: React.FC<Props> = ({ favicon }) => favicon ? (
  <link rel="icon" href={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${favicon.filename}`} />
) : (
  <></>
);

export default Favicon;
