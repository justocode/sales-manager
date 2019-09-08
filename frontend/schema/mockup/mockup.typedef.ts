import { gql } from 'apollo-boost';

export const typeDef = gql`
  type Mockup {
    id: ID!
    name: String
    image: String
  }

  input MockupInput {
    id: ID!
    name: String!
    image: String!
  }

  extend type Mutation {
    createMockup(input: MockupInput): Mockup
  }

  extend type Query {
    mockups: [Mockup]
  }
`;
