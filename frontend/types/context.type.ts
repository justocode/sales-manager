import { InMemoryCache } from 'apollo-boost';

export interface Context {
  cache: InMemoryCache;
}
