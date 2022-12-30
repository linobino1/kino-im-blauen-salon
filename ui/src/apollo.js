import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache({
  addTypename: false,
});

const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: import.meta.env.VITE_APP_API_URL + '/api/graphql',
  })
})

export default apolloClient;
