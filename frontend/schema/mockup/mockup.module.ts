import { typeDef } from './mockup.typedef';
import { resolvers } from './mockup.resolver';
import { createModule } from 'apollo-modulizer';

export const Mockup = createModule({ typeDef, resolvers });
