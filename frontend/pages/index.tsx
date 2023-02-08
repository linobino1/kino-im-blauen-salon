import React from 'react';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { homePageSlug } from '@/lib/homePageSlug';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <p>{t('Welcome')}</p>
  )
}

export default LandingPage;

export const getStaticProps: GetStaticProps = async () => {
  const slug = await homePageSlug();
  if (slug) {
    console.log(`redirect '/' to /${slug}`);
    return {
      redirect: {
        destination: `/${slug}`,
        permanent: false,
      },
      revalidate: 10,
    }
  } else {
    return {
      props: {}
    }
  }
};
