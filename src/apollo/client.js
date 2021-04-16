import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const CLIENT_URL = process.env.REACT_APP_MININGTOKEN_SUBGRAPHS_URL

export const client = new ApolloClient({
  link: new HttpLink({
    uri: CLIENT_URL
  }),
  cache: new InMemoryCache(),
  shouldBatch: true
})
