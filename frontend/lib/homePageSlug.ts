import apollo from "@/graphql/apollo";
import { gql } from "@apollo/client";

export const homePageSlug = async (): Promise<string> => {
  return (await apollo.query({
    query: gql`
      query homePageSlug {
        Site {
          homePage {
            slug
          }
        }
      }
    `,
  })).data.Site.homePage.slug;
}
