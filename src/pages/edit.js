import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const EditNote = props => {
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return <Note note={data.note} />;
};

export default EditNote;
