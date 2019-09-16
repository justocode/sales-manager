import { gql } from 'apollo-boost';

export const POST_FRAGMENT = gql`
  fragment post on Post {
    id
    title
    content
    author {
      id
      email
    }
  }
`;

export const POSTS_QUERY = gql`
  ${POST_FRAGMENT}

  query posts {
    posts {
      ...post
    }
  }
`;
