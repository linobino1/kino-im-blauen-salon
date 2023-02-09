/* eslint-disable no-case-declarations */
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Post,
  Screening,
} from '@/payload-types';
import NotFound from '@/components/NotFound';
import Head from '@/components/Head';
import { pageConf as getPageConf, PageConf, pageConfToSiteConf } from '@/lib/pageConf';
import { allPosts } from '@/lib/allPosts';
import { allScreenings } from '@/lib/allScreenings';
import { allPagesSlugs } from '@/lib/allPagesSlugs';
import { DefaultLayout } from '@/layouts/default';
import Blocks from '@/components/Blocks';

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

      <Blocks layout={page.layout} posts={posts} screenings={screenings} />

    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const pageConf = await getPageConf(ctx.params?.page as string);

  const hasPosts = pageConf.page.layout?.some((item) => item.blockType === 'postsList');
  const hasScreenings = pageConf.page.layout?.some((item) => item.blockType === 'screeningsList');

  return pageConf ? {
    props: {
      pageConf,
      posts: (hasPosts && await allPosts()) ?? null,
      screenings: (hasScreenings && await allScreenings()) ?? null,
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