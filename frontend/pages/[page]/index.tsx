/* eslint-disable no-case-declarations */
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Post,
  Screening,
} from '@/payload-types';
import NotFound from '@/components/NotFound';
import Head from '@/components/Head';
import classes from '@/css/page.module.css';
import RichText from '@/components/RichText';
import { Posts } from '@/components/Posts';
import { Screenings } from '@/components/Screenings';
import { pageConf as getPageConf, PageConf, pageConfToSiteConf } from '@/lib/pageConf';
import { allPosts } from '@/lib/allPosts';
import { allScreenings } from '@/lib/allScreenings';
import { allPagesSlugs } from '@/lib/allPagesSlugs';
import { DefaultLayout } from '@/layouts/default';

type Props = {
  pageConf: PageConf
  posts?: Post[]
  screenings?: Screening[]
};

export const Page: React.FC<Props> = ({
  pageConf, posts, screenings,
}) => {
  const { page } = pageConf;

  if (!page) {
    return <NotFound />;
  }

  return (
    <DefaultLayout siteConf={pageConfToSiteConf(pageConf)}>
      <Head
        title={page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
      />

      <RichText content={page.content} />

      {page.type === 'posts' && (
        <Posts posts={posts} />
      )}

      {page.type === 'screenings' && (
        <Screenings screenings={screenings} />
      )}

    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageConf = await getPageConf(ctx.params?.page as string);
  const { page } = pageConf;

  return pageConf ? {
    props: {
      pageConf,
      posts: (page.type === 'posts' && await allPosts()) ?? null,
      screenings: (page.type === 'screenings' && await allScreenings()) ?? null,
    },
    revalidate: 10,
  } : {
    notFound: true,
    revalidate: 10,
  }
};

/**
 * return all pages 
 */
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await allPagesSlugs()).map((page) => (
      {
        params: {
          page: page.slug,
        },
      }
    )),
    fallback: 'blocking', // revalidate if unknown slug encountered
  };
};

export default Page;