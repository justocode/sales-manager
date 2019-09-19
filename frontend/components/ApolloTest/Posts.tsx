import _ from 'lodash';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { POSTS_QUERY } from '~/frontend/operations/post.operation';
import { PostsQuery, PostsQueryVariables } from '~/frontend/types/operations.type';

function ApolloTest() {
  const { data, loading, error } = useQuery<PostsQuery, PostsQueryVariables>(POSTS_QUERY);

  const posts = _.get(data, 'posts') || [];

  return (
    <ul>
      <h3>Posts</h3>
      {posts.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

export default ApolloTest;
