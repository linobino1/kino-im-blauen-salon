import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import React from 'react';
import { apollo } from '@/graphql/apollo';
import { gql } from '@apollo/client';

// this "page" should always redirect to the page that is set to be the
// homepage within getServerSideProps()
export const Page: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <p>
      {t('Welcome')}
    </p>
  );
};

export const getStaticProps: GetStaticProps = async ({
  locale,
}) => {

  // try redirect to landing page
  return apollo.query({
    query: gql`
      query Site {
        Site {
          homePage {
            slug
          }
        }
      }
    `,
  })
  .then((res) => {
    return {
      redirect: {
        destination: `/${res.data.Site.homePage.slug}`,
        permanent: false,
      },
    };
  })
  .catch( async () => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'de', [
          'common',
        ])),
        // Will be passed to the page component as props
      },
    }
  })
}

export default Page;
