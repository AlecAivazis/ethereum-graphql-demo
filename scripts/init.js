const Web3 = require("web3");
const fs = require("fs");
const { auctionContract, hubContract } = require("../contracts");

// create our ethereum client
const web3 = new Web3("http://localhost:8545");

// create each auction
Promise.all(
  [...new Array(3)].map(async (_, i) => {
    // create an auction
    const auction = await auctionContract
      .deploy({
        data: auctionBytecode,
        arguments: [`Auction ${i}`]
      })
      .send({
        from: "address from above",
        gas: 1400000,
        gasPrice: web3.utils.toWei("0.00002", "ether")
      });

    // we want a list of each address that we created
    return auction.address;
  })
).then(async addresses => {
  // create a hub with the list of addresses
  const hub = await hubContract
    .deploy({
      data: auctionBytecode,
      arguments: [addresses]
    })
    .send({
      from: "address from above",
      gas: 1400000,
      gasPrice: web3.utils.toWei("0.00002", "ether")
    });

  console.log(`Hub deployed at ${hub.address}`);
});
