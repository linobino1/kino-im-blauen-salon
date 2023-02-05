import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import classes from '@/css/auth.module.css';
import Head from '@/components/Head';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

export const Me: React.FC = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('auth');

  return (
    <main className={classes.main}>
      <Head
        title={t('My Account') as string}
      />
      <div className={classes.centered}>
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
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'auth',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default Me;
