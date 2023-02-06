/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEventHandler } from 'react';
import { signIn, SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from '@/css/auth.module.css';
import Head from '@/components/Head';
import { Input } from '@/components/Input';
import { useTranslation } from 'next-i18next';

export const SignIn: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const data: SignInOptions = {
      email: target.email?.value,
      password: target.password?.value,
      callbackUrl: window.location.origin,
      redirect: false,
    };
    const res = await signIn('login', data);

    if (!res?.ok) {
      alert('wrong credentials');
    } else {
      router.push(process.env.NEXT_PUBLIC_SERVER_URL || '/');
    }
  };

  return (
    <main className={classes.main}>
      <Head
        title={t('Sign In') as string}
      />
      <form onSubmit={handleSubmit} className={classes.centered}>
        <Input
          label={t('Email')}
          name="email"
          type="email"
        />

        <Input
          label={t('Password')}
          name="password"
          type="password"
        />

        <button type="submit">{t('Sign In')}</button>
      </form>
    </main>
  );
};

export default SignIn;
