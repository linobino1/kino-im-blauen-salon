import apollo from "@/graphql/apollo";
import { Screening } from "@/payload-types";
import { gql } from "@apollo/client";

export const allScreenings = async (): Promise<Screening[]> => {
  return (await apollo.query({
    query: gql`
      query allScreenings {
        Screenings {
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
  })).data.Screenings.docs;
}