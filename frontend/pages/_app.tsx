import React, { Fragment } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '@/next-i18next.config.js'
import type { Page } from '@/types/page';

import '../css/global.css';


type Props = AppProps & {
  Component: Page
}
const MyApp = ({ Component, pageProps }: Props) => {

  // use page-specific layout
  const getLayout = Component.getLayout ?? (page => page)
  const Layout = Component.layout ?? Fragment

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
