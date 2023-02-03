import { GetStaticProps } from 'next';
import payload from 'payload';
import React from 'react';
import { _t } from '../i18n';

// this "page" should always redirect to the page that is set to be the
// homepage within getStaticProps()
export const Page: React.FC = () => (
  <p>
    {_t('Welcome')}
  </p>
);

export const getStaticProps: GetStaticProps = async () => {
  const site = await payload.findGlobal({
    slug: 'site',
    locale: 'en',
  });
  return {
    redirect: {
      destination: `/${site.homePage.slug}`,
      permanent: false,
    },
    revalidate: 60, // fetch homepage on each request but max. once per minute
  };
};

export default Page;
