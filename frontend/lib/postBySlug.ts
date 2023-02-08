import apollo from "@/graphql/apollo";
import { Post } from "@/payload-types";
import { gql } from "@apollo/client";

export const postBySlug = async (slug: string): Promise<Post> => {
  return (await apollo.query({
    query: gql`
      query postBySlug($slug: String!) {
        Posts(where: { slug: { equals: $slug }}) {
          docs {
            title
            slug
            header {
              filename
              alt
            }
            content
            date
          }
        }
      }
    `,
    variables: {
      slug,
    },
  })).data.Posts.docs[0];
}