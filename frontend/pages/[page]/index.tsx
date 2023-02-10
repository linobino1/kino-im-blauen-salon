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
import { getPosts } from '@/lib/getPosts';
import { getScreenings } from '@/lib/getScreenings';
import { allPagesSlugs } from '@/lib/allPagesSlugs';
import { DefaultLayout } from '@/layouts/default';
import Blocks from '@/components/Blocks';
import { parseISO } from 'date-fns';
import { isPostsList, isScreeningsList, PostsListBlock, ScreeningsListBlock } from '@/types/blocks';

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

  const postsList: PostsListBlock | undefined = pageConf.page.layout?.find(isPostsList);
  const screeningsList: ScreeningsListBlock | undefined = pageConf.page.layout?.find(isScreeningsList);

  return pageConf ? {
    props: {
      pageConf,
      posts: (postsList && await getPosts(
        postsList.from as string ? parseISO(postsList.from as string) : undefined,
        postsList.until as string ? parseISO(postsList.until as string) : undefined
      )) ?? null,
      screenings: (screeningsList && await getScreenings(
        screeningsList.from as string ? parseISO(screeningsList.from as string) : undefined,
        screeningsList.until as string ? parseISO(screeningsList.until as string) : undefined
      )) ?? null,
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