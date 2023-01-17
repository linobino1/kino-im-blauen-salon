import { Field } from 'payload/types';
import slugify from 'slugify';

function createSlugField(forField: string): Field {
  return {
    name: 'slug',
    type: 'text',
    unique: true,
    index: true,
    hooks: {
      beforeValidate: [
        // 'value' is this field's specific incoming value
        // 'data' is all of the incoming values for the document
        async ({ value, data }) => (
          data?.[forField]
            ? slugify(data[forField], {
              lower: true,
            })
            : value
        ),
      ],
    },
    admin: {
      readOnly: true,
    },
  };
}

export default createSlugField;
