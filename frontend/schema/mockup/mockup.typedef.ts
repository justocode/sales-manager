import { gql } from 'apollo-boost';

export const typeDef = gql`

  type Color {
    name: String!
    hex: String!
    amzColor: String!
  }

  input ColorInput {
    name: String!
    hex: String!
    amzColor: String!
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
    patternName: String!
    sku: String!
    color: Color!
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
    patternName: String!
    sku: String!
    color: ColorInput!
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
