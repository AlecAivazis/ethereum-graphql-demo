import { makeExecutableSchema } from 'graphql-tools'
import { HubABI, AuctionABI } from '../contracts'

const schema = `
    type Auction {
        itemName: String!
    }

    type Query {
        allAuctions: [Auction!]!
    }
`;

const resolvers = {
    Auction: {
        // auction is an instance of the Auction contract wrapper
        itemName: auction => auction.itemName.call(),
    },
    Query: {
        allAuctions: () => {
            // create a reference to the hub contract we created earlier
            const hub = new web3.eth.Contract(HubABI, 'address from earlier')

            // we have to return an auction contract for each address
            // saved in the hub contract
            return (await hub.auctions.call()).map(
                addr => new web3.eth.Contract(AuctionABI, addr)
            )
        }
    },
}

export default makeExecutableSchema({
    typeDefs: schema,
    resolvers,
})
