/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import classes from '@/css/header.module.css';
import {
  Site,
  Media,
  Navigation as NavigationType,
} from '@/payload-types';
import { Navigation } from '../Navigation';
import { mediaUrl } from '@/util/mediaUrl';
import { UserStatus } from '../UserStatus';

type Props = {
  title: string
  mainNavigation?: NavigationType
  socialNavigation?: NavigationType
  site: Site
  headerImage?: string | Media
};

const Header: React.FC<Props> = ({
  title, mainNavigation, socialNavigation, site, headerImage,
}) => {
  const router = useRouter();

  const [menuVisible, setMenuVisible] = React.useState<boolean>();
  const menuOpen = () => {
    setMenuVisible(true);
  };

  const menuClose = () => {
    setMenuVisible(false);
  };

  return (
    <header className={classes.header}>
      <div className={classes.mainHeader}>
        <Link href="/">
          {site.favicon as Media && (
            <Image
              className={classes.mainLogo}
              src={mediaUrl(site.favicon as Media)}
              width={200}
              height={50}
              alt="logo"
            />
          )}
        </Link>
        <button
          onClick={menuOpen}
          type="button"
          className={classes.menuOpen}
        />
        <div className={`${classes.navMainContainer} ${menuVisible && classes.visible}`}>
          <button
            onClick={menuClose}
            type="button"
            className={classes.menuClose}
          />
          <Navigation navigation={mainNavigation} className={classes.navMain} />
        </div>
        <UserStatus />
      </div>
      { headerImage as Media && (
        <div className={classes.imageHeader}>
          <Image
            className={classes.headerImage}
            src={mediaUrl(headerImage as Media)}
            alt={(headerImage as Media)?.alt}
            fill
            priority
          />
          <div className={classes.imageHeaderOverlay}>
            <button
              type="button"
              className={classes.backButton}
              onClick={() => router.back()}
              aria-label="back"
            />
            <Navigation navigation={socialNavigation} className={classes.navSocial} />
          </div>
        </div>
      )}
      <h1 className={classes.titleHeader}>
        {title}
      </h1>
    </header>
  );
};

export default Header;
