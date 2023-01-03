import { Field } from 'payload/types';

function createSlugField(forField: string): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    hooks: {
      beforeChange: [
        // 'value' is this field's specific incoming value
        // 'data' is all of the incoming values for the document
        async ({ value, data }) => data?.[forField]?.replace(/ /g, '-').toLowerCase() ?? value,
      ],
    },
    admin: {
      readOnly: true,
    },
  };
}

export default createSlugField;
