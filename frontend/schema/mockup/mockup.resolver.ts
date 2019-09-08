import { Resolvers } from '~/frontend/types/schema.type';
import { MOCKUPS_QUERY } from '~/frontend/operations/mockup.operation';
import { MockupsQuery } from '~/frontend/types/operations.type';

export const resolvers: Resolvers = {
  Mutation: {
    createMockup: async (parent, args, context) => {
      const { cache } = context;
      const __typename: 'Mockup' = 'Mockup';

      const mockup = {
        __typename,
        ...args.input
      };

      const query = MOCKUPS_QUERY;

      try {
        const { mockups }: MockupsQuery = cache.readQuery({ query });

        cache.writeQuery({ query, data: { mockups: [...mockups, mockup] } });
      } catch (error) {
        cache.writeQuery({ query, data: { mockups: [mockup] } });
      }

      return mockup;
    }
  },
  Query: {
    mockups: async (parent, args, context) => {
      try {
        const { mockups }: MockupsQuery = context.cache.readQuery({ query: MOCKUPS_QUERY });
        return mockups;
      } catch (error) {
        return null;
      }
    }
  }
};
