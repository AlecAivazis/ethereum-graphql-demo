const Web3 = require("web3");
const fs = require("fs");

// create our ethereum client
const web3 = new Web3("http://localhost:8545");

// load the compilation artifacts
const hubBytecode = fs.readFileSync("contracts_sol_AuctionHub.bin").toString();
const hubABI = JSON.parse(
  fs.readFileSync("contracts_sol_AuctionHub.abi").toString()
);
const auctionBytecode = fs.readFileSync("contracts_sol_Auction.bin").toString();
const auctionABI = JSON.parse(
  fs.readFileSync("contracts_sol_Auction.abi").toString()
);

// define contract wrappers
const hubContract = new web3.eth.Contract(hubABI);
const auctionContract = new web3.eth.Contract(auctionABI);

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
