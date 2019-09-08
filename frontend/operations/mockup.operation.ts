import { gql } from 'apollo-boost';

export const MOCKUP_FRAGMENT = gql`
  fragment mockup on Mockup {
    id
    name
    image
  }
`;

export const CREATE_MOCKUP_MUATION = gql`
  ${MOCKUP_FRAGMENT}

  mutation createMockup($input: MockupInput!) {
    createMockup(input: $input) @client {
      ...mockup
    }
  }
`;

export const MOCKUPS_QUERY = gql`
  ${MOCKUP_FRAGMENT}

  query mockups {
    mockups @client {
      ...mockup
    }
  }
`;
