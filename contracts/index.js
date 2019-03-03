// hub imports
import hubBytecode from "./contracts_hub_sol_AuctionHub.bin";
import hubABISource from "./contracts_hub_sol_AuctionHub.abi";
// auction imports
import auctionBytecode from "./contracts_auction_sol_Auction.bin";
import auctionABISource from "./contracts_auction_sol_Auction.abi";

export const hubABI = JSON.parse(hubABISource);
export const auctionABI = JSON.parse(auctionABISource);

// define contract wrappers
export const hubContract = new web3.eth.Contract(hubABI);
export const auctionContract = new web3.eth.Contract(auctionABI);
