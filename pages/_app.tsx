/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import '../css/style.css';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default MyApp;
