/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { signIn, SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from '../../css/auth.module.css';
import { _t } from '../../i18n';
import Head from '../../components/Head';
import { Input } from '../../components/Input';

export const SignIn: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data: SignInOptions = {
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: window.location.origin,
      redirect: false,
    };
    const res = await signIn('login', data);

    if (!res.ok) {
      alert('wrong credentials');
    } else {
      router.push(process.env.NEXT_PUBLIC_SERVER_URL);
    }
  };

  return (
    <main className={classes.main}>
      <Head
        title={_t('Sign In')}
      />
      <form onSubmit={handleSubmit} className={classes.centered}>
        <Input
          label={_t('Email')}
          name="email"
          type="email"
        />

        <Input
          label={_t('Password')}
          name="password"
          type="password"
        />

        <button type="submit">{_t('Sign In')}</button>
      </form>
    </main>
  );
};

export default SignIn;
