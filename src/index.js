// external imports
import React from "react";
import ReactDom from "react-dom";
import gql from 'graphql-tag'
import { Query, ApolloProvider } from 'react-apollo'
import '@babel/polyfill'
// local imports
import client from './client'

const App = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          allAuctions {
            itemName
          }
        }
      `}
      >
      {({loading, error, data}) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error {JSON.stringify(error)}</p>;

        // return an entry for each auction we found
        return (
          <>
            <h1>Auctions</h1>
            {data.allAuctions.map(auction => (
              <div key={auction.itemName}>{auction.itemName}</div>
            ))}
          </>
        );
      }}
    </Query>
  </ApolloProvider>
);


ReactDom.render(<App/>, document.getElementById("app"))