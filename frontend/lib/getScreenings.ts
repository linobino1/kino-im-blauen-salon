import apollo from "@/graphql/apollo";
import { Screening } from "@/payload-types";
import { gql } from "@apollo/client";

const epoch = new Date(0);
const today = new Date();
const in10Years = new Date(today.setFullYear(today.getFullYear() + 10));

export const getScreenings = async (from?: Date, until?: Date): Promise<Screening[]> => {
  if (!(from as Date)) from = epoch;
  if (!(until as Date)) until = in10Years;

  return (await apollo.query({
    query: gql`
      query getScreenings($from: DateTime!, $until: DateTime!) {
        Screenings(
          where: {
            date: { greater_than_equal: $from},
            AND: { date: { less_than_equal: $until }},
          }
          sort: "date"
        ) {
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