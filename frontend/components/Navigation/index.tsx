import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
  Page,
  Media,
  Navigation as NavigationType,
} from '@/payload-types';
import classes from '@/css/nav.module.css';
import { mediaUrl } from '@/util/mediaUrl';

type Props = {
  navigation?: NavigationType
  className?: string
};

export const Navigation: React.FC<Props> = ({ navigation, className }) => {
  const { asPath } = useRouter();

  // each item renders as either an internal link, an external link with an icon or text, or another navigation
  return navigation ? (
    <nav className={`${classes.nav} ${classes[navigation.type]} ${className}`}>
      {navigation?.items.map(({
        id, icon, subnavigation, page, url, name,
      }) => {
        const href = page as Page ? `/${(page as Page).slug}` : url;

        const isActive = (
          asPath === `/${(page as Page)?.slug}`
        );

        // image or plain text
        const inner: React.ReactNode = icon ? (
          <Image
            src={mediaUrl(icon as Media)}
            alt={(icon as Media)?.alt}
            fill
          />
        ) : (
          <span>{name}</span>
        );

        // subnavigation or link
        return (
          <div key={id}>
            { subnavigation ? (
              <Navigation
                navigation={subnavigation as NavigationType}
              />
            ) : (
              <Link
                href={href}
                className={`${classes.navItem} ${isActive && classes.active}`}
              >
                {inner}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  ) : (<></>);
};

export default Navigation;
