import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from '@/components/Head';
import React, { ReactNode } from 'react';
import { Media } from '@/payload-types';
import classes from '@/css/defaultLayout.module.css';
import { SiteConf } from '@/lib/siteConf';

export type Props = {
  title?: string
  image?: Media
  siteConf: SiteConf
  children: NonNullable<ReactNode>
};

export const DefaultLayout: React.FC<Props> = ({ children, siteConf, title, image }) => {
  const { site, navigations } = siteConf;

  return (
    <>
      <div className={classes.page}>
        <Head
          title={title || siteConf.site.title}
          favicon={site.favicon as Media}
        />
        <Header
          title={title}
          mainNavigation={navigations && navigations.find((x) => x.type === 'main')}
          socialNavigation={navigations && navigations.find((x) => x.type === 'socialMedia')}
          site={site}
          headerImage={image}
        />

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

export default DefaultLayout;