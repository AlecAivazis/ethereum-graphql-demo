// external imports
import { Environment, Network, RecordSource, Store } from "relay-runtime";
import { graphql } from 'graphql'
// local imports
import schema from "./schema";

function fetchQuery(operation, variables) {
  return graphql(schema, operation.text, null, null, variables);
}

export default new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource())
});
