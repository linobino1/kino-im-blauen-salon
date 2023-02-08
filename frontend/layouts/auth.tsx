import Footer from '@/components/Footer';
import Head from '@/components/Head';
import React, { ReactNode } from 'react';
import { Media } from '@/payload-types';
import classes from '@/css/authLayout.module.css';
import { SiteConf } from '@/lib/siteConf';

export type Props = {
  title?: string
  image?: Media
  siteConf: SiteConf
  children: NonNullable<ReactNode>
};

export const AuthLayout: React.FC<Props> = ({ children, siteConf, title, image }) => {
  const { site, navigations } = siteConf;

  return (
    <>
      <Head
        title={title || siteConf.site.title}
        favicon={site.favicon as Media}
      />

      <div className={classes.mainWrapper}>
        <main className={classes.main}>
          {children}
        </main>
      </div>

      <Footer
        site={site}
        footerNavigation={navigations?.find((x) => x.type === 'footer')}
        socialNavigation={navigations?.find((x) => x.type === 'socialMedia')}
      />
    </>
  )
}

export default AuthLayout;