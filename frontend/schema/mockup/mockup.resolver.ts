import { Resolvers } from '~/frontend/types/schema.type';
import { MOCKUPS_QUERY } from '~/frontend/operations/mockup.operation';
import isServer from 'detect-node';

export const resolvers: Resolvers = {
  Mutation: {
    createMockup: (parent, args, context) => {
      if (isServer) return null;

      const { cache } = context;
      const __typename: 'Mockup' = 'Mockup';

      const mockup = {
        __typename,
        id: 'dsfds',
        name: 'dsfdsfds',
        image: 'dsfds'
      };

      try {
        const { mockups } = cache.readQuery({ query: MOCKUPS_QUERY });

        cache.writeData({ data: { mockups: [...mockups, mockup] } });
      } catch (error) {
        cache.writeData({ data: { mockups: [mockup] } });
      }

      return mockup;
    }
  }
};
