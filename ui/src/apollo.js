import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

console.log('apollo.js', import.meta.env);

const apiHost = import.meta.env.VITE_DOMAIN_API ?? 'https://localhost:3000';
console.log('apollo url', apiHost);
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
