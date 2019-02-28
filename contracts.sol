pragma solidity ^0.5.0;

// the primary contract for our auctions
contract Auction {
    string public itemName;
}

// the central contract that knows the address of each auction
contract AuctionHub {
    // the list of auctions
    address[] public auctions;
}
