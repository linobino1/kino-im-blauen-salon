import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { _t } from '../../i18n';
import classes from '../../css/userstatus.module.css';

export const UserStatus: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className={classes.userStatus}>
      { session ? (
        <Link href="/auth/me" className={classes.email}>{session.user.email}</Link>
      ) : (
        <Link href="/auth/signin" className={classes.signIn}>
          {_t('Sign In')}
        </Link>
      )}
    </div>
  );
};
