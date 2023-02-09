import apollo from "@/graphql/apollo";
import { Page } from "@/payload-types";
import { gql } from "@apollo/client";

export const pageBySlug = async (slug: string): Promise<Page> => {
  return (await apollo.query({
    query: gql`
      query pageBySlug ($slug: String!) {
        Pages(where: { slug: { equals: $slug }}) {
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
    variables: {
      slug,
    },
  })).data.Pages.docs[0];
}