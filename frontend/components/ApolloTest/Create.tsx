import _ from 'lodash';
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_MOCKUP_MUATION } from '~/frontend/operations/mockup.operation';
import { CreateMockupMutationVariables, CreateMockupMutation } from '~/frontend/types/operations.type';

function Create() {
  const [createMockup, { data, loading, error }] = useMutation<CreateMockupMutation, CreateMockupMutationVariables>(
    CREATE_MOCKUP_MUATION
  );

  const mockup = _.get(data, 'createMockup');

  console.log({ mockup });

  return (
    <button
      onClick={() =>
        createMockup({
          variables: {
            input: {
              id: Date.now().toString(),
              name: Date.now().toString(),
              image: Date.now().toString()
            }
          }
        })
      }
    >
      Create Mockup
    </button>
  );
}

export default Create;
