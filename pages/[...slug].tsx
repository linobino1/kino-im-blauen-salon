/* eslint-disable no-case-declarations */
import React from 'react';
import payload from 'payload';
import { GetServerSideProps } from 'next';
import {
  Site,
  Page as PageType,
  Navigation,
  Post,
  Screening,
  Media,
} from '../payload-types';
import { PageTypeEnum } from '../collections/Pages';
import { NavigationTypesEnum } from '../collections/Navigations';
import NotFound from '../components/NotFound';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import Header from '../components/Header';
import RichText from '../components/RichText';
import { Posts } from '../components/Posts';
import { Footer } from '../components/Footer';
import { Screenings } from '../components/Screenings';

type Props = {
  site?: Site
  navigations?: Navigation[]
  page?: PageType
  posts?: Post[]
  screenings?: Screening[]
  statusCode: number
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
          mainNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.main)}
          socialNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.socialMedia)}
          site={site}
          headerImage={page.image}
        />

        <div className={classes.mainstage}>
          <RichText content={page.content} />

          {page.type === PageTypeEnum.posts && (
            <Posts posts={posts} />
          )}

          {page.type === PageTypeEnum.screenings && (
            <Screenings screenings={screenings} />
          )}
        </div>

      </main>
      <Footer
        site={site}
        footerNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.footer)}
        socialNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.socialMedia)}
      />
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug ? (ctx.params.slug as string[])?.join('/') : 'home';

  const pageQuery = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const siteQuery = await payload.findGlobal({
    slug: 'site',
  });

  const navigationsQuery = await payload.find({
    collection: 'navigations',
    depth: 5,
  });

  if (!pageQuery || !siteQuery || !navigationsQuery) {
    ctx.res.statusCode = 500;

    return {
      props: {},
    };
  }

  const site: Site = siteQuery;
  const page: PageType = pageQuery.docs[0] || null;
  const navigations: Navigation[] = navigationsQuery.docs;

  let posts: Post[] = [];
  let screenings: Screening[] = [];
  switch (page?.type) {
    case PageTypeEnum.posts:
      const postsQuery = await payload.find({
        collection: 'posts',
      });

      if (postsQuery) {
        posts = postsQuery.docs;
      }
      break;

    case PageTypeEnum.screenings:
      const screeningsQuery = await payload.find({
        collection: 'screenings',
        depth: 7,
      });

      if (screeningsQuery) {
        screenings = screeningsQuery.docs;
      }
      break;

    default:
  }

  return {
    props: {
      site,
      navigations,
      page,
      posts,
      screenings,
    },
  };
};
