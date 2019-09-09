import { mergeModules } from 'apollo-modulizer';

import { Mockup } from './mockup/mockup.module';

export const { typeDefs, resolvers } = mergeModules([Mockup]);
