import apollo from "@/graphql/apollo";
import { Post } from "@/payload-types";
import { gql } from "@apollo/client";

export const allPosts = async (): Promise<Post[]> => {
  return (await apollo.query({
    query: gql`
      query allPosts {
        Posts {
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
  })).data.Posts.docs;
}