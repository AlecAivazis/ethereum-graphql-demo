import React from "react";
import ReactDom from "react-dom";
import { QueryRenderer, graphql } from "react-relay";
import environment from "./environment";

const App = () => (
  <QueryRenderer
    query={graphql`
      query srcQuery {
        allAuctions {
          itemName
        }
      }
    `}
    environment={environment}
    render={({ props, error }) => {
      // if there was an error
      if (error) {
        return `There was an error: ${error}`;
      }

      // if we are still loading
      if (!props) {
        return "loading";
      }

      // return an entry for each auction we found
      return (
        <>
          <h1>Auctions</h1>
          {props.allAuctions.map(auction => (
            <div key={auction.itemName}>{auction.itemName}</div>
          ))}
        </>
      );
    }}
  />
);
