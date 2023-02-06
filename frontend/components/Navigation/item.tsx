import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  Page,
  Media,
  Navigation as NavigationType,
} from '@/payload-types';
// eslint-disable-next-line import/no-cycle
import { Navigation as NavigationComponent } from '.';
import classes from '@/css/nav.module.css';
import { mediaUrl } from '@/util/mediaLoader';

export type Props = {
  type?: 'internal' | 'external' | 'subnavigation'
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
      src={mediaUrl(icon as Media)}
      alt={(icon as Media)?.alt}
      width={32}
      height={32}
    />
  ) : (
    <span>{name}</span>
  );

  switch (type) {
    case 'internal':
      isActive = (router.asPath === `/${(page as Page)?.slug}`);
      return (
        <Link
          href={`/${(page as Page)?.slug}`}
          className={`${classes.navItem} ${isActive && classes.active}`}
        >
          {inner}
        </Link>
      );

    case 'external':
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

    case 'subnavigation':
      return (
        <NavigationComponent navigation={subnavigation as NavigationType} />
      );
    default:
      return null;
  }
};

export default NavigationItem;
