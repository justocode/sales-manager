import _ from 'lodash';
import React from 'react';
import Create from './Create';
import List from './List';

import { useQuery } from '@apollo/react-hooks';
import { POSTS_QUERY } from '~/frontend/operations/post.operation';
import { PostsQuery, PostsQueryVariables } from '~/frontend/types/operations.type';

function ApolloTest() {
  const { data, loading, error } = useQuery<PostsQuery, PostsQueryVariables>(POSTS_QUERY);

  const posts = _.get(data, 'posts');

  console.log({ posts });

  return (
    <>
      <Create></Create>
      <List></List>
    </>
  );
}

export default ApolloTest;
