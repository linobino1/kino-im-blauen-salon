import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Post, Screening } from '@/payload-types';
import { Post as PostComponent } from '@/components/Posts/Post';
import { Screening as ScreeningComponent } from '@/components/Screenings/Screening';
import { postBySlug } from '@/lib/postBySlug';
import { pageBySlug } from '@/lib/pageBySlug';
import { screeningBySlug } from '@/lib/screeningBySlug';
import { allPosts } from '@/lib/allPosts';
import { allScreenings } from '@/lib/allScreenings';
import { ParsedUrlQuery } from 'querystring';
import { allPages } from '@/lib/allPages';
import { getSiteConf, SiteConf } from '@/lib/siteConf';
import DefaultLayout from '@/layouts/default';

type Props = {
  post?: Post
  screening?: Screening
  siteConf: SiteConf
};

export const Item: React.FC<Props> = ({ post, screening, siteConf }) => (
  <DefaultLayout siteConf={siteConf}>
    { post ? (
      <PostComponent post={post} />
    ) : screening ? (
      <ScreeningComponent screening={screening} />
    ) : (
      <p>item not found</p>
    )}
  </DefaultLayout>
);

export default Item;

export const getStaticProps: GetStaticProps = async (ctx) => {

  const page = await pageBySlug(ctx.params?.page as string);
  const slug = ctx.params?.item as string;

  return {
    props: {
      siteConf: await getSiteConf(),
      post: (page?.type === 'posts' && await postBySlug(slug).catch((e) => { console.log(e) })) ?? null,
      screening: (page?.type === 'screenings' && await screeningBySlug(slug).catch((e) => { console.log(e) })) ?? null,
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: Array<string | { params: ParsedUrlQuery; locale?: string }> = [];

  (await allPages()).forEach(async (page) => {

    // all posts
    if (page.type === 'posts') {
      (await allPosts()).forEach((item) => {
        paths.push({
          params: {
            page: page.slug,
            item: item.slug,
          },
        });
      });
    }

    // all screenings
    if (page.type === 'screenings') {
      (await allScreenings()).forEach((item) => {
        paths.push({
          params: {
            page: page.slug,
            item: item.slug,
          },
        });
      });
    }
  });
  
  return {
    paths,
    fallback: 'blocking',
  };
}