import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import dotenv from 'dotenv';

dotenv.config();

console.log('apollo.js', process?.env);

const apiHost = process?.env.VITE_DOMAIN_API || 'https://localhost:3000';
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
