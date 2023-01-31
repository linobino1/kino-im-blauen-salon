import React from 'react';
import payload from 'payload';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import { Type as PageType } from '../collections/Page';
import { Type as SiteType } from '../globals/Site';
import { NavigationTypesEnum, Navigation } from '../collections/Navigations';
import NotFound from '../components/NotFound';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import RenderBlocks from '../components/RenderBlocks';
import SiteHeader from '../components/SiteHeader';

const { publicRuntimeConfig: { SERVER_URL } } = getConfig();

export type Props = {
  page?: PageType
  site?: SiteType
  navigations?: Navigation[]
  statusCode: number
};

const Page: React.FC<Props> = (props) => {
  const { page, site, navigations } = props;

  const title: string = [
    page?.meta?.title || page?.title,
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
      <SiteHeader
        title={page.title}
        mainNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.main)}
        socialNavigation={navigations?.find((x) => x.type === NavigationTypesEnum.socialMedia)}
        site={site}
        headerImage={page.image}
      />
      <div className={classes.featuredImage}>
        {page.image && (
          <img
            src={`${SERVER_URL}/media/${page.image.sizes?.feature?.filename || page.image.filename}`}
            alt={page.image.alt}
          />
        )}
      </div>
      <RenderBlocks layout={page.layout} />
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

  if (!pageQuery.docs[0]) {
    ctx.res.statusCode = 404;

    return {
      props: {},
    };
  }

  const siteQuery = await payload.findGlobal({
    slug: 'site',
  });

  const navigationsQuery = await payload.find({
    collection: 'navigations',
    depth: 5,
  });

  if (!siteQuery || !navigationsQuery) {
    ctx.res.statusCode = 500;

    return {
      props: {},
    };
  }

  return {
    props: {
      page: pageQuery.docs[0],
      site: siteQuery,
      navigations: navigationsQuery.docs,
    },
  };
};
