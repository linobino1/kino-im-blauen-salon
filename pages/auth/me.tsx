import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { _t } from '../../i18n';
import classes from '../../css/auth.module.css';

export const Me: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className={classes.main}>
      <div className={classes.centered}>
        { session ? (
          <>
            <p>
              Signed in as
              {' '}
              {session.user.email}
            </p>
            <button type="button" onClick={() => signOut()}>
              {_t('Sign out')}
            </button>
          </>
        ) : (
          <Link href="/auth/signin">Sign In</Link>
        )}
      </div>
    </main>
  );
};

export default Me;
