import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { Type as SiteType } from '../../globals/Site';
import { Type as NavigationType } from '../../collections/Navigations';
import classes from '../../css/siteHeader.module.css';
import Navigation from '../Navigation';
import { MediaType } from '../../collections/Media';
import { mediaLoader } from '../../utilities/mediaLoader';
import { UserStatus } from '../UserStatus';

type Props = {
  title: string
  mainNavigation?: NavigationType
  socialNavigation?: NavigationType
  site: SiteType
  headerImage?: MediaType
};

const SiteHeader: React.FC<Props> = ({
  title, mainNavigation, socialNavigation, site, headerImage,
}) => {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.mainHeader}>
        <Link href="/">
          <Image
            className={classes.mainLogo}
            loader={mediaLoader}
            src={site.favicon.filename}
            width={200}
            height={50}
            alt="logo"
          />
        </Link>
        <Navigation navigation={mainNavigation} />
        <UserStatus />
      </div>
      <div className={classes.imageHeader}>
        <Image
          className={classes.headerImage}
          loader={mediaLoader}
          src={headerImage.filename}
          fill
          alt={headerImage.alt}
        />
        <div className={classes.imageHeaderOverlay}>
          <button
            type="button"
            className={classes.backButton}
            onClick={() => router.back()}
            aria-label="back"
          />
          <Navigation navigation={socialNavigation} />
        </div>
      </div>
      <h1 className={classes.titleHeader}>
        {title}
      </h1>
    </header>
  );
};

export default SiteHeader;
