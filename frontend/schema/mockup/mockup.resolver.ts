import { Resolvers } from '~/frontend/types/schema.type';
import { MOCKUPS_QUERY } from '~/frontend/operations/mockup.operation';

export const resolvers: Resolvers = {
  Mutation: {
    createMockup: async (parent, args, context) => {
      const { cache } = context;
      const __typename: 'Mockup' = 'Mockup';

      const mockup = {
        __typename,
        ...args.input
      };

      try {
        const { mockups } = cache.readQuery({ query: MOCKUPS_QUERY });

        cache.writeData({ data: { mockups: [...mockups, mockup] } });
      } catch (error) {
        cache.writeData({ data: { mockups: [mockup] } });
      }

      return mockup;
    }
  },
  Query: {
    mockups: async (parent, args, context) => {
      try {
        const { mockups } = context.cache.readQuery({ query: MOCKUPS_QUERY });
        return mockups;
      } catch (error) {
        return null;
      }
    }
  }
};
