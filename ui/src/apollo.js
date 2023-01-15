import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const apiHost = import.meta.env.VITE_DOMAIN_API
  ? `https://${import.meta.env.VITE_DOMAIN_API}`
  : 'https://localhost:3000';
const cache = new InMemoryCache({
  addTypename: false,
});

const apollo = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: `${apiHost}/api/graphql`,
    credentials: 'include',
  }),
});

provideApolloClient(apollo);

export default apollo;
