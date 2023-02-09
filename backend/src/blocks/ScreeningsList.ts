import { Block } from "payload/types";

export const ScreeningsList: Block = {
  slug: 'screeningsList',
  fields: [
    {
      name: 'from',
      type: 'date',
    },
  ],
};

export default ScreeningsList;
