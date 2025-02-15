import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Button from '../components/Button';

import { GET_NOTES } from '../gql/query';

const Home = () => {
  useEffect(() => {
    // update the document title
    document.title = 'Notedly';
  });

  //query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* Only display the Load More button if hasNextPage is true */}
      {data.noteFeed.hasNextPage && (
        // onClick peform a query, passing the current cursor as a variable
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // combine the new results and the old
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes,
                    ],
                    __typename: 'noteFeed',
                  },
                };
              },
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
