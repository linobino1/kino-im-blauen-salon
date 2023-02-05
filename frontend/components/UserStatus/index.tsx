import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import classes from '@/css/userstatus.module.css';
import { useTranslation } from 'next-i18next';

export const UserStatus: React.FC = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();

  return (
    <div className={classes.userStatus}>
      { session ? (
        <Link href="/auth/me" className={classes.name}>{session.user?.name}</Link>
      ) : (
        <Link href="/auth/signin" className={classes.signIn}>
          {t('Sign In')}
        </Link>
      )}
    </div>
  );
};
