import React from 'react';
import {
  Site as SiteType,
  Navigation as NavigationType,
} from '@/payload-types';
import classes from '@/css/footer.module.css';
import { Navigation } from '../Navigation';
import RichText from '../RichText';

type Props = {
  footerNavigation?: NavigationType
  socialNavigation?: NavigationType
  site: SiteType
};

export const Footer: React.FC<Props> = ({
  footerNavigation, socialNavigation, site,
}) => (
  <footer className={classes.footer}>
    <RichText content={site.address} className={classes.address} />
    <Navigation navigation={footerNavigation} className={classes.navFooter} />
    <Navigation navigation={socialNavigation} className={classes.navSocial} />
    <div className={classes.newsletter}>newsletter</div>
  </footer>
);

export default Footer;
