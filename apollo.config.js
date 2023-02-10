// this file is useful in development. It enables apollo to get the api schema
// and enables auto-complete when writing graphql queries
module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      localSchemaFile: './backend/schema.graphql',

    },
    // Files processed by the extension
    includes: [
      'frontend/**/*.ts',
      'frontend/**/*.tsx',
    ],
    excludes: [
      'frontend/node_modules/**/*.*',
    ],
  },
};