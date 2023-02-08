import apollo from "@/graphql/apollo";
import { Navigation, Page, Site } from "@/payload-types";
import { gql } from "@apollo/client";

export type Returns = {
  site: Site
  page: Page
  navigations: Navigation[]
}
export const getPageConf = async (pageSlug: string): Promise<Returns> => {
  const data = (await apollo.query({
    query: gql`
      query getPageConf($pageSlug: String!) {
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
        Pages (where: {slug: { equals: $pageSlug }}) {
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
      pageSlug,
    }
  })).data;

  return {
    site: data.Site,
    page: data.Pages.docs[0],
    navigations: data.Navigations.docs,
  };
}