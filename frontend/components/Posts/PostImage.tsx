import Image from 'next/image';
import React from 'react';
import { mediaLoader } from '@/util/mediaLoader';
import { Media } from '@/payload-types';

export const PostImage: React.FC<{ image: Media }> = ({ image }) => (
  <Image
    loader={mediaLoader}
    src={image.filename as string}
    alt={image.alt}
    fill
  />
);
