import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';

import { GET_NOTES } from '../gql/query';
import { NEW_NOTE } from '../gql/mutation';

const NewNote = props => {
  useEffect(() => {
    // Update the document title
    document.title = 'New Note — Notedly';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: data => {
      // When complete, redirect the user to the note page
      props.history.push(`/note/${data.newNote.id}`);
    },
  });

  return (
    <React.Fragment>
      {/* as the mutation is loading, display a loading message */}
      {loading && <p>Loading...</p>}
      {/* if there is an error, display an error message */}
      {error && <p>Error saving the note</p>}
      {/* the form component, passing the mutation as a prop*/}
      <NoteForm action={data} />
    </React.Fragment>
  );
};

export default NewNote;
