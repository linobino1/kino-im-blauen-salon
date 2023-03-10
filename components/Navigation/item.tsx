import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Page,
  Media,
  Navigation as NavigationType,
} from '../../payload-types';
// eslint-disable-next-line import/no-cycle
import { Navigation as NavigationComponent } from '.';
import { NavigationItemTypesEnum } from '../../collections/Navigations';
import classes from '../../css/nav.module.css';
import { mediaLoader } from '../../utilities/mediaLoader';

export type Props = {
  type?: NavigationItemTypesEnum
  name: string;
  page: string | Page;
  url: string;
  icon?: string | Media;
  subnavigation?: string | NavigationType;
  id?: string;
};

export const NavigationItem: React.FC<Props> = ({
  type, name, page, url, icon, subnavigation,
}) => {
  const router = useRouter();
  let isActive = false;
  const inner: React.ReactNode = icon ? (
    <Image
      loader={mediaLoader}
      src={(icon as Media)?.filename}
      alt={(icon as Media)?.alt}
      fill
    />
  ) : (
    <span>{name}</span>
  );

  switch (type) {
    case NavigationItemTypesEnum.internal:
      isActive = (router.asPath === `/${(page as Page)?.slug}`);
      return (
        <Link
          href={`/${(page as Page)?.slug}`}
          className={`${classes.navItem} ${isActive && classes.active}`}
        >
          {inner}
        </Link>
      );

    case NavigationItemTypesEnum.external:
      return (
        <a
          className={classes.navItem}
          target="_blank"
          rel="noreferrer"
          href={url}
        >
          {inner}
        </a>
      );

    case NavigationItemTypesEnum.subnavigation:
      return (
        <NavigationComponent navigation={subnavigation as NavigationType} />
      );
    default:
      return null;
  }
};

export default NavigationItem;
