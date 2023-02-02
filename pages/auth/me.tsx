import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { _t } from '../../i18n';

const callbackUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/`;

export const Me: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
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
    <button type="button" onClick={() => signIn(undefined, { callbackUrl })}>
      {_t('Sign in')}
    </button>
  );
};

export default Me;
