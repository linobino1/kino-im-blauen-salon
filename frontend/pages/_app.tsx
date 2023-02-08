import React from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '@/next-i18next.config.js'

import '../css/global.css';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
  </SessionProvider>
);

export default appWithTranslation(MyApp, nextI18NextConfig);
