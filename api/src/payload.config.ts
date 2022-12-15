import { buildConfig } from 'payload/config';
import path from 'path';
import Users from './collections/Users';
import Movies from './collections/Movies';
import Directors from './collections/Directors';

export default buildConfig({
  serverURL: 'http://127.0.0.1:3000',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Movies,
    Directors,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
