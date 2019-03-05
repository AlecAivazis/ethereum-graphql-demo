pragma solidity ^0.5.0;

// the central contract that knows the address of each auction
contract AuctionHub {
    // the list of auctions
    address[] public auctions;

    constructor(address[] memory addresses) public {
        auctions = addresses;
    }

    function auctionCount() public view returns (uint count) {
        return auctions.length; 
    }
}
