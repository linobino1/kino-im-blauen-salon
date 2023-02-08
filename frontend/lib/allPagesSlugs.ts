import apollo from "@/graphql/apollo";
import { Page } from "@/payload-types";
import { gql } from "@apollo/client";

export const allPagesSlugs = async (): Promise<Page[]> => {
  return (await apollo.query({
    query: gql`
      query allPagesSlugs {
        Pages {
          docs {
            slug
          }
        }
      }
    `,
  })).data.Pages.docs;
}