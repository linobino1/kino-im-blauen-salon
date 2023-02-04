import React from 'react';
import { Media } from '../../payload-types';
import { mediaLoader } from '../../utilities/mediaLoader';

type Props = {
  favicon?: Media
};

export const Favicon: React.FC<Props> = ({ favicon }) => favicon && (
  <link rel="icon" href={mediaLoader({ src: favicon.filename, width: 200 })} />
);

export default Favicon;
