import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { _t } from '../../i18n';
import classes from '../../css/auth.module.css';
import Head from '../../components/Head';

export const Me: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={classes.main}>
      <Head
        title={_t('My Account')}
      />
      <div className={classes.centered}>
        { session ? (
          <>
            <p>
              {_t('Signed in as {name}', {
                name: session.user.name,
              })}
            </p>
            <button type="button" onClick={() => signOut()}>
              {_t('Sign Out')}
            </button>
          </>
        ) : (
          <>
            <p>{_t('Not signed in.')}</p>
            <Link href="/auth/signin">
              <button type="button">
                {_t('Sign In')}
              </button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Me;
