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
    },
  })).data.Pages.docs[0];
}