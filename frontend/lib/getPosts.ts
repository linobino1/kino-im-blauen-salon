import apollo from "@/graphql/apollo";
import { Post } from "@/payload-types";
import { gql } from "@apollo/client";

const epoch = new Date(0);
const today = new Date();
const in10Years = new Date(today.setFullYear(today.getFullYear() + 10));

export const getPosts = async (from?: Date, until?: Date): Promise<Post[]> => {
  if (!(from as Date)) from = epoch;
  if (!(until as Date)) until = in10Years;

  return (await apollo.query({
    query: gql`
      query getPosts($from: DateTime!, $until: DateTime!) {
        Posts(
          where: {
            date: { greater_than_equal: $from, less_than_equal: $until }
          }
          sort: "date"
        ) {
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
      from,
      until,
    }
  })).data.Posts.docs;
}