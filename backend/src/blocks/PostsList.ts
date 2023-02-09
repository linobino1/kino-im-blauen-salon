import { Block } from "payload/types";

export const PostsList: Block = {
  slug: 'postsList',
  fields: [
    {
      name: 'from',
      type: 'date',
    },
  ],
};

export default PostsList;
