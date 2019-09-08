import _ from 'lodash';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MOCKUPS_QUERY } from '~/frontend/operations/mockup.operation';
import { MockupFragment } from '~/frontend/types/operations.type';

function List() {
  const { data, loading, error } = useQuery(MOCKUPS_QUERY);

  const mockups: MockupFragment[] = _.get(data, 'mockups') || [];

  return (
    <ul>
      {mockups.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default List;
