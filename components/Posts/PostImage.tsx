import Image from 'next/image';
import React from 'react';
import { mediaLoader } from '../../utilities/mediaLoader';
import { MediaType } from '../../collections/Media';

export const PostImage: React.FC<{ image: MediaType }> = ({ image }) => (
  <Image
    loader={mediaLoader}
    src={image.filename}
    alt={image.alt}
    fill
  />
);
