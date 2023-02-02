import React from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { _t } from '../../i18n';

export const UserStatus: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
    <Link href="/auth/me">{session.user.email}</Link>
  ) : (
    <button type="button" onClick={() => signIn()}>{_t('Sign in')}</button>
  );
};
