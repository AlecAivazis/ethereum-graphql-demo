import Web3 from "web3";

// hub imports
export hubBytecode from "./contracts_hub_sol_AuctionHub.bin";
import hubABISource from "./contracts_hub_sol_AuctionHub.abi";
// auction imports
export auctionBytecode from "./contracts_auction_sol_Auction.bin";
import auctionABISource from "./contracts_auction_sol_Auction.abi";

// create the instance of web3 we will share everywhere
export const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export const HubABI = JSON.parse(hubABISource);
export const AuctionABI = JSON.parse(auctionABISource);
