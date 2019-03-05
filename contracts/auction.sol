pragma solidity ^0.5.0;

// the primary contract for our auctions
contract Auction {
    string public itemName;

    constructor(string memory _name) public {
        itemName = _name;
    }
}
