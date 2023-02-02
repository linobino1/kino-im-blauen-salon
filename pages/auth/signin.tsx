/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { signIn, SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';
import payload from 'payload';
import classes from '../../css/auth.module.css';
import { Input } from '../../components/Input';
import { Type as SiteType } from '../../globals/Site';

export const SignIn: React.FC = (props: SiteType) => {
  const { homePage: { slug } } = props;
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
      alert('wrong credentials')
    } else {
      router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}`);
    }
  };

  return (
    <main className={classes.main}>
      <form onSubmit={handleSubmit} className={classes.centered}>
        <Input
          label="Email"
          name="email"
          type="email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export const getStaticProps = async () => {
  const res = await payload.findGlobal({
    slug: 'site',
  });

  return {
    props: res,
  };
};

export default SignIn;
