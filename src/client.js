// external imports
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { Observable } from 'apollo-link-core'
import { graphql } from 'graphql'
import { print } from 'graphql/language/printer';
// local imports
import schema from './schema'

const blockChainLink = new ApolloLink(
    (operation) => new Observable(observer => {
        graphql(schema, print(operation.query), null, null, operation.variables)
            .then(result => {
                observer.next(result)
                observer.complete()
            })
    })
        
)

export default new ApolloClient({
    link: blockChainLink,
    cache: new InMemoryCache(),
})