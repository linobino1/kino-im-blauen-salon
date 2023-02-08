import apollo from "@/graphql/apollo";
import { Screening } from "@/payload-types";
import { gql } from "@apollo/client";

export const screeningBySlug = async (slug: string): Promise<Screening> => {
  return (await apollo.query({
    query: gql`
      query screeningBySlug($slug: String!) {
        Screenings(where: { slug: { equals: $slug }}) {
          docs {
            id
            title
            slug
            date
            time
            filmprint {
              movie {
                header {
                  filename
                  alt
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      slug,
    },
  })).data.Screenings.docs[0];
}