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

type Props = {
  post?: Post
  screening?: Screening
};

export const Item: React.FC<Props> = ({ post, screening }) => {
  if (post) return (
    <PostComponent post={post} />
  );
  if (screening) return (
    <ScreeningComponent screening={screening} />
  );
  else return (
    <p>item not found</p>
  );
};

export default Item;

export const getStaticProps: GetStaticProps = async (ctx) => {

  const page = await pageBySlug(ctx.params?.page as string);
  const slug = ctx.params?.item as string;

  return {
    props: {
      post: (page.type === 'posts' && await postBySlug(slug).catch((e) => { console.log(e) })) ?? null,
      screening: (page.type === 'screenings' && await screeningBySlug(slug).catch((e) => { console.log(e) })) ?? null,
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