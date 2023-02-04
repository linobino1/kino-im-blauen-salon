/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import classes from '../../css/header.module.css';
import {
  Site,
  Media,
  Navigation as NavigationType,
} from '../../payload-types';
import { Navigation } from '../Navigation';
import { mediaLoader } from '../../utilities/mediaLoader';
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
          <Image
            className={classes.mainLogo}
            loader={mediaLoader}
            src={(site.favicon as Media)?.filename}
            width={200}
            height={50}
            alt="logo"
          />
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
      <div className={classes.imageHeader}>
        <Image
          className={classes.headerImage}
          loader={mediaLoader}
          src={(headerImage as Media)?.filename}
          fill
          alt={(headerImage as Media)?.alt}
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
      <h1 className={classes.titleHeader}>
        {title}
      </h1>
    </header>
  );
};

export default Header;
