import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Head from '@/components/Head';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { SiteConf, getSiteConf } from '@/lib/siteConf';
import AuthLayout from '@/layouts/auth';

export type Props = {
  siteConf: SiteConf
};

export const Me: React.FC<Props> = ({ siteConf }) => {
  const { data: session } = useSession();
  const { t } = useTranslation('auth');

  return (
    <AuthLayout siteConf={siteConf}>
      <Head
        title={t('My Account') as string}
      />
      { session ? (
        <>
          <p>
            {t('Signed in as {{name}}', session.user || {})}
          </p>
          <button type="button" onClick={() => signOut()}>
            {t('Sign Out')}
          </button>
        </>
      ) : (
        <>
          <p>{t('Not signed in.')}</p>
          <Link href="/auth/signin">
            <button type="button">
              {t('Sign In')}
            </button>
          </Link>
        </>
      )}
    </AuthLayout>
  );
};


export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'auth',
      ])),
      siteConf: await getSiteConf(),
    },
    revalidate: 10,
  }
}

export default Me;
