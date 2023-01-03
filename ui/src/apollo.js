import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';
import { provideApolloClient } from '@vue/apollo-composable';

const cache = new InMemoryCache({
  addTypename: false,
});

const apollo = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: `${import.meta.env.VITE_APP_API_URL}/api/graphql`,
    credentials: 'include',
  }),
});

provideApolloClient(apollo);

export default apollo;
