import React from 'react';
import payload from 'payload';
import { GetServerSideProps } from 'next';
import { PageTypeEnum, Type as PageType } from '../collections/Pages';
import { Type as SiteType } from '../globals/Site';
import { NavigationTypesEnum, Type as NavigationType } from '../collections/Navigations';
import NotFound from '../components/NotFound';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import Header from '../components/Header';
import RichText from '../components/RichText';
import { Posts } from '../components/Posts';
import { Type as PostType } from '../collections/Posts';

export type Props = {
  site?: SiteType
  navigations?: NavigationType[]
  page?: PageType
  posts?: PostType[]
  statusCode: number
};

const Page: React.FC<Props> = ({
  site, navigations, page, posts,
}) => {
  const title: string = [
    page?.title,
    site?.title,
  ].filter(Boolean).join(' | ');

  if (!page) {
    return <NotFound />;
  }

  return (
    <main className={classes.page}>
      <Head
        title={title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
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
      </div>

      <footer className={classes.footer}>
        <hr />
        NextJS + Payload Server Boilerplate made by
        {' '}
        <a
          href="https://payloadcms.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Payload
        </a>
      </footer>
    </main>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug ? (ctx.params.slug as string[]).join('/') : 'home';

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

  const site: SiteType = siteQuery;
  const page: PageType = pageQuery.docs[0] || null;
  const navigations: NavigationType[] = navigationsQuery.docs;

  let posts: PostType[] = [];
  if (page?.type === PageTypeEnum.posts) {
    const postsQuery = await payload.find({
      collection: 'posts',
    });

    if (postsQuery) {
      posts = postsQuery.docs;
    }
  }

  return {
    props: {
      site,
      navigations,
      page,
      posts,
    },
  };
};
