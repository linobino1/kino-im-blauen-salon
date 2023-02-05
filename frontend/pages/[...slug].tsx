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
} from '../payload-types';
import NotFound from '../components/NotFound';
import Head from '../components/Head';
import classes from '../css/page.module.css';
import Header from '../components/Header';
import RichText from '../components/RichText';
import { Posts } from '../components/Posts';
import { Footer } from '../components/Footer';
import { Screenings } from '../components/Screenings';
import apollo from '@/graphql/apollo';
import { gql } from '@apollo/client';

type Props = {
  site: Site
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
  const slug = ctx.params?.slug ? (ctx.params.slug as string[])?.join('/') : 'home';

  const { data, error } = await apollo.query({
    query: gql`
      query Page($slug: String!) {
        Site {
          title
          favicon {
            filename
          }
          address
          homePage {
            slug
          }
        }
        Navigations {
          docs {
            type
            items {
              type
              name
              url
              page {
                slug
              }
              icon {
                filename
                alt
              }
            }
          }
        }
        Pages (where: {slug: { equals: $slug }}) {
          docs {
            title
            type
            image {
              filename
              alt
            }
            meta {
              keywords
              description
            }
            content
          }
        }
      }
    `,
    variables: {
      slug, 
    }
  });

  if (error) {
    return {
      props: {}
    }
  }

  const page: PageType = data.Pages.docs[0] || null;
  if (!page) {
    return {
      notFound: true,
    }
  }

  // query posts or screenings
  let posts: Post[] = [];
  let screenings: Screening[] = [];
  switch (page?.type) {
    case 'posts':
      const { data: postsData } = await apollo.query({
        query: gql`
          query Posts {
            Posts {
              docs {
                title
                slug
                header {
                  filename
                  alt
                }
                content
              }
            }
          }
        `,
      });
      if (postsData) {
        posts = postsData.Posts.docs;
      }
      break;

    case 'screenings':
      const { data: screeningsData } = await apollo.query({
        query: gql`
          query Screenings {
            Screenings {
              docs {
                id
                title
                slug
                date
                time
                filmprint {
                  movie {
                    header {
                      filename
                      alt
                    }
                  }
                }
              }
            }
          }
        `,
      });
      console.log(screeningsData)
      if (screeningsData) {
        screenings = screeningsData.Screenings.docs;
      }
      break;

    default:
  }

  return {
    props: {
      site: data.Site,
      navigations: data.Navigations.docs,
      page: data.Pages.docs[0],
      posts,
      screenings,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  const { data, error } = await apollo.query({
    query: gql`
      query Paths {
        Pages {
          docs {
            slug
          }
        }
        Posts {
          docs {
            slug
          }
        }
        Screenings {
          docs {
            slug
          }
        }
      }
    `,
  });

  // all pages
  data?.Pages.docs.map((page: PageType) => {
    paths.push({
      params: {
        slug: [ page.slug as string ],
      },
    });
  });

  const { data: postsData, error: postsError } = await apollo.query({
    query: gql`
      query PostPages {
        Pages(where: { type: { equals: posts }}) {
          docs {
            slug
          }
        }
      }
    `,
  });

  // all post pages
  postsData?.Pages.docs.map((postPage: PageType) => {
    data.Posts.docs.map((post: Post) => {
      paths.push({
        params: {
          slug: [ postPage.slug, post.slug, ],
        },
      });
    });
  });

  const { data: screeningsData, error: screeningsError } = await apollo.query({
    query: gql`
      query ScreeningPages {
        Pages(where: { type: { equals: screenings }}) {
          docs {
            slug
          }
        }
      }
    `,
  });

  // all screening pages
  screeningsData?.Pages.docs.map((screeningPage: PageType) => {
    data.Screenings.docs.map((screening: Screening) => {
      paths.push({
        params: {
          slug: [ screeningPage.slug, screening.slug, ],
        },
      });
    });
  });

  return {
    paths,
    fallback: 'blocking',
  }
};