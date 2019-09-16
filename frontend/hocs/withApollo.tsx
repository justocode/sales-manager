import 'isomorphic-unfetch';
import isServer from 'detect-node';
import React, { ComponentType } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { typeDefs, resolvers } from '~/frontend/schema';

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: '/api'
  }),
  typeDefs: isServer ? [] : typeDefs,
  resolvers: isServer ? {} : resolvers
});

function withApollo<T>(WrappedComponent: ComponentType<T>) {
  return function ComponentWithApollo(props: T) {
    return (
      <ApolloProvider client={client}>
        <WrappedComponent {...props} />
      </ApolloProvider>
    );
  };
}

export default withApollo;
