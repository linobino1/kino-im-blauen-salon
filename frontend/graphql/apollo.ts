import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  addTypename: false,
});

export const apollo = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: process.env.GRAPHQL_LOCALHOST || 'http://localhost:3000/api/graphql',
  }),
});

export default apollo;
