import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';
import dotenv from 'dotenv';

dotenv.config();

const apiHost = import.meta.env?.VITE_APP_DOMAIN_API
  ? `https://${import.meta.env.VITE_APP_DOMAIN_API}`
  : 'https://localhost:3000';
const cache = new InMemoryCache({
  addTypename: false,
});

const apollo = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: apiHost,
    credentials: 'include',
  }),
});

provideApolloClient(apollo);

export default apollo;
