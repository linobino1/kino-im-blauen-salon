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
            image {
              filename
              alt
            }
            meta {
              keywords
              description
            }
            layout {
              __typename
              ... on Content {
                blockType
                content
              }
              ... on PostsList {
                blockType
                from
              }
              ... on ScreeningsList {
                blockType
                from
              }
            }
          }
        }
      }
    `,
  })).data.Pages.docs;
}