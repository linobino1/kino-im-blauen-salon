import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from '@keystone-6/core/fields';

export default list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
        // by adding isRequired, we enforce that every User should have a name
        //   if no name is provided, an error will be displayed
        title: text({ validation: { isRequired: true } }),

        createdAt: timestamp({
          // this sets the timestamp to Date.now() when the user is first created
          defaultValue: { kind: 'now' },
        }),
    },
});
