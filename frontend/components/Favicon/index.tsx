import React from 'react';
import { Media } from '@/payload-types';
import { mediaUrl } from '@/util/mediaUrl';

type Props = {
  favicon: Media
};

export const Favicon: React.FC<Props> = ({ favicon }) => favicon ? (
  <link rel="icon" href={mediaUrl(favicon)} />
) : (
  <></>
);

export default Favicon;
