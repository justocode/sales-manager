import { gql } from 'apollo-boost';

export const typeDef = gql`

  type COLOR {
    name: String
    hex: String
    amzColor: String
  }

  type Mockup {
    id: Int!
    name: String!
    addedAt: Int!
    uploadedAt: Int
    recycledAt: Int
    mugId: Int!
    mugName: String!
    designId: Int!
    designName: String!
    patternId: Int!
    patternName: String!
    sku: String!
    color: COLOR!
    link: String
    sharedLink: String
    b64: String
  }

  input MockupInput {
    id: Int!
    name: String!
    addedAt: Int!
    uploadedAt: Int
    recycledAt: Int
    mugId: Int!
    mugName: String!
    designId: Int!
    designName: String!
    patternId: Int!
    patternName: String!
    sku: String!
    color: COLOR!
    link: String
    sharedLink: String
    b64: String
  }

  extend type Mutation {
    createMockup(input: MockupInput): Mockup
  }

  extend type Query {
    mockups: [Mockup]
  }
`;
