import _ from 'lodash';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MOCKUPS_QUERY } from '~/frontend/operations/mockup.operation';
import { MockupsQuery, MockupsQueryVariables } from '~/frontend/types/operations.type';

function List() {
  const { data, loading, error } = useQuery<MockupsQuery, MockupsQueryVariables>(MOCKUPS_QUERY);

  const mockups = _.get(data, 'mockups') || [];

  return (
    <ul>
      <h3>Mockups</h3>
      {mockups.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default List;
