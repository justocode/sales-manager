import { gql } from 'apollo-boost';

export const MOCKUP_FRAGMENT = gql`
  fragment mockup on Mockup {
    id
    name
    image
  }
`;

export const MOCKUPS_QUERY = gql`
  ${MOCKUP_FRAGMENT}

  query mockups on Mockup {
    ...mockup
  }
`;
