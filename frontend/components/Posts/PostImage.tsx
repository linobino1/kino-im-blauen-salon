import Image from 'next/image';
import React from 'react';
import { Media } from '@/payload-types';
import { mediaUrl } from '@/util/mediaLoader';

export const PostImage: React.FC<{ image: Media }> = ({ image }) => (
  <Image
    src={mediaUrl(image)}
    alt={image.alt}
    fill
  />
);
