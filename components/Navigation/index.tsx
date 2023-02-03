import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
  Page,
  Media,
  Navigation as NavigationType,
} from '../../payload-types';
import classes from '../../css/nav.module.css';
import { mediaLoader } from '../../utilities/mediaLoader';
// eslint-disable-next-line import/no-cycle

type Props = {
  navigation: NavigationType
  className?: string
};

export const Navigation: React.FC<Props> = ({ navigation, className }) => {
  const router = useRouter();

  return (
    <nav className={`${classes.nav} ${classes[navigation?.type]} ${className}`}>
      {navigation.items.map(({
        id, icon, subnavigation, page, url, name,
      }) => {
        const href = (page as Page)?.slug || url;

        const isActive: boolean = (router.asPath === `/${(page as Page)?.slug}`);

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

        return subnavigation ? (
          <Navigation
            navigation={subnavigation as NavigationType}
          />
        ) : (
          <Link
            key={id}
            href={href}
            className={`${classes.navItem} ${isActive && classes.active}`}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
