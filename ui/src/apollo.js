import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import log from 'loglevel';

log.debug('loading apollo client');

const cache = new InMemoryCache({
  addTypename: false,
});

const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: `${import.meta.env.VITE_APP_API_URL}/api/graphql`,
  }),
});

provideApolloClient(apolloClient);

export default apolloClient;
