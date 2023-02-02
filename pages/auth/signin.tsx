/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { signIn, SignInOptions, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const SignIn: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data: SignInOptions = {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    };
    const res = await signIn('login', data);

    if (!res.ok) {
      alert('wrong credentials')
    } else {
      router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{session && session.user.email }</p>
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" />

      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" />

      <button type="submit">Login</button>
    </form>
  );
};

export default SignIn;
