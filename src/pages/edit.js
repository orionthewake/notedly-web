import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_ME, GET_NOTE } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  const id = props.match.params.id;

  // query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userData } = useQuery(GET_ME);

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    },
  });

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // if the user is not the note author
  if (userData.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }

  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
