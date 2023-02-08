import apollo from "@/graphql/apollo";
import { Page } from "@/payload-types";
import { gql } from "@apollo/client";
import { SiteConf } from "./siteConf";

export type PageConf = SiteConf & {
  page: Page
};

export const pageConf = async (pageSlug: string): Promise<PageConf> => {
  const data = (await apollo.query({
    query: gql`
      query pageConf($pageSlug: String!) {
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

export const pageConfToSiteConf = (pageConf: PageConf): SiteConf => ({
  site: pageConf.site,
  navigations: pageConf.navigations,
});
