import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import fetch from 'node-fetch'
// import { gql } from 'graphql-tag';
// or you can use `import gql from 'graphql-tag';` instead

const data = {
  design: {
    __typename: 'Design',
  },
  pattern: {
    __typename: 'Pattern',
  },
  mug: {
    __typename: 'Mug',
  },
  mockup:  {
    __typename: 'Mockup',
  },
};

const cache = new InMemoryCache();
cache.writeData({ data });

const client = new ApolloClient({
  fetch: fetch,
  cache,
  resolvers: {
  //   Mutation: {
  //     updateMugs: (_root, variables, { cache, getCacheKey }) => {
  //       const mugs = getCacheKey({ __typename: 'mugs' });
  //       console.log('Mutation updateMugs', mugs);
  //       const newMugs = {...mugs};
  //       cache.writeData({ mugs: newMugs });
  //       return null;
  //     },
  //   },
    Query: {
      mockups: (_root, variables, { cache, getCacheKey }) => {
        return getCacheKey({ __typename: 'Mockup' });
      },
    }
  },
});


// client.onResetStore(() => cache.writeData({ data }));

export default function withApolloClientHook(App: any) {
  return class AppWithApolloClientHook extends Component {

    public static async getInitialProps(appContext: any) {

      let initialProps = {};

      if (typeof App.getInitialProps === 'function') {
        initialProps = await App.getInitialProps(appContext);
      }

      return { ...initialProps };
    }

    public render() {
      console.log('AppWithApolloClientHook initial');
      return (
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <App {...this.props} />
          </ApolloHooksProvider>
        </ApolloProvider>
      );
    }
  };
}
