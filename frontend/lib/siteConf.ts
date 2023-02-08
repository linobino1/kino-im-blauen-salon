import apollo from "@/graphql/apollo";
import { Navigation, Site } from "@/payload-types";
import { gql } from "@apollo/client";

export type SiteConf = {
  site: Site
  navigations: Navigation[]
}
export const getSiteConf = async (): Promise<SiteConf> => {
  const data = (await apollo.query({
    query: gql`
      query getSiteConf {
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
      }
    `,
  })).data;

  return {
    site: data.Site,
    navigations: data.Navigations.docs,
  };
}