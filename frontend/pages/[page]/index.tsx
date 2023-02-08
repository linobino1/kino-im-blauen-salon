/* eslint-disable no-case-declarations */
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  Site,
  Page as PageType,
  Navigation,
  Post,
  Screening,
  Media,
} from '@/payload-types';
import NotFound from '@/components/NotFound';
import Head from '@/components/Head';
import classes from '@/css/page.module.css';
import Header from '@/components/Header';
import RichText from '@/components/RichText';
import { Posts } from '@/components/Posts';
import { Footer } from '@/components/Footer';
import { Screenings } from '@/components/Screenings';
import { getPageConf } from '@/lib/pageConf';
import { allPosts } from '@/lib/allPosts';
import { allScreenings } from '@/lib/allScreenings';
import { allPagesSlugs } from '@/lib/allPagesSlugs';

type Props = {
  site: Site
  navigations?: Navigation[]
  page?: PageType
  posts?: Post[]
  screenings?: Screening[]
};

const Page: React.FC<Props> = ({
  site, navigations, page, posts, screenings,
}) => {
  const title: string = [
    page?.title,
    site?.title,
  ].filter(Boolean).join(' | ');

  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <main className={classes.page}>
        <Head
          title={title}
          description={page.meta?.description}
          keywords={page.meta?.keywords}
          favicon={site.favicon as Media}
        />
        <Header
          title={page.title}
          mainNavigation={navigations && navigations.find((x) => x.type === 'main')}
          socialNavigation={navigations && navigations.find((x) => x.type === 'socialMedia')}
          site={site}
          headerImage={page.image}
        />

        <div className={classes.mainstage}>
          <RichText content={page.content} />

          {page.type === 'posts' && (
            <Posts posts={posts} />
          )}

          {page.type === 'screenings' && (
            <Screenings screenings={screenings} />
          )}
        </div>

      </main>
      <Footer
        site={site}
        footerNavigation={navigations?.find((x) => x.type === 'footer')}
        socialNavigation={navigations?.find((x) => x.type === 'socialMedia')}
      />
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { site, page, navigations } = await getPageConf(ctx.params?.page as string);

  return page ? {
    props: {
      site,
      page,
      navigations,
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