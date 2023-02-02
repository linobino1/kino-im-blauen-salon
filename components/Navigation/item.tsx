import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
// eslint-disable-next-line import/no-cycle
import Navigation from '.';
import { NavigationItem as NavigationItemType, NavigationItemTypesEnum } from '../../collections/Navigations';
import classes from '../../css/nav.module.css';
import { mediaLoader } from '../../utilities/mediaLoader';

type Props = {
  item: NavigationItemType
};

const NavigationItem: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  let isActive = false;
  const inner: React.ReactNode = item.icon ? (
    <Image
      loader={mediaLoader}
      src={item.icon.filename}
      alt={item.icon.alt}
      fill
    />
  ) : (
    <span>{item.name}</span>
  );

  switch (item.type) {
    case NavigationItemTypesEnum.internal:
      isActive = (router.asPath === `/${item?.page?.slug}`);
      return (
        <Link
          href={`/${item.page.slug}`}
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
          href={item.url}
        >
          {inner}
        </a>
      );

    case NavigationItemTypesEnum.subnavigation:
      return (
        <Navigation navigation={item.subnavigation} />
      );
    default:
      return null;
  }
};

export default NavigationItem;
