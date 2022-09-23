import ApolloClient from "apollo-boost";
import { HttpLink, InMemoryCache } from "apollo-boost";
import VueApollo from "vue-apollo";
import Vue from "vue";

const myCustomLink = "https://v7mnw3m03.lp.gql.zone/graphql";

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: myCustomLink,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

Vue.use(VueApollo);
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
