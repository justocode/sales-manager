import isServer from 'detect-node';
import { mergeModules } from 'apollo-modulizer';

import { Mockup } from './mockup/mockup.module';

export function getSchema() {
  const empty = {
    typeDefs: [],
    resolvers: {}
  };

  return isServer ? empty : mergeModules([Mockup]);
}
