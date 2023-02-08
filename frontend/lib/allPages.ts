import apollo from "@/graphql/apollo";
import { Page } from "@/payload-types";
import { gql } from "@apollo/client";

export const allPages = async (): Promise<Page[]> => {
  return (await apollo.query({
    query: gql`
      query allPages {
        Pages {
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
  })).data.Pages.docs;
}