const fs = require("fs");
const {
  AuctionABI,
  HubABI,
  auctionBytecode,
  hubBytecode,
  web3
} = require("../contracts");

const ADDRESS = "0xa15994ea31e602e2492c3855f92ab57b8716ee21"

// create each auction
Promise.all(
  [...new Array(3)].map(async (_, i) => {
    console.log("deploying auction", i)

    // create an auction
    const auction = await new web3.eth.Contract(AuctionABI)
      .deploy({
        data: auctionBytecode,
        arguments: [`Auction ${i}`]
      })
      .send({
        from: ADDRESS,
        gas: 1400000,
        gasPrice: web3.utils.toWei("0.00002", "ether")
      })

    // we want a list of each address that we created
    return auction.address;
  })
).then(async addresses => {
  console.log("deploying hub with auction addresses", addresses)

  // create a hub with the list of addresses
  const hub = await new web3.eth.Contract(HubABI)
    .deploy({
      data: hubBytecode,
      arguments: [addresses]
    })
    .send({
      from: ADDRESS,
      gas: 1400000,
      gasPrice: web3.utils.toWei("0.00002", "ether")
    });

  console.log(`Hub deployed at ${hub.address}`);

  process.exit()
})
.catch(err => {
  console.error(err)
  process.exit()
});

