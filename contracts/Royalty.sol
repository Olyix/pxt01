// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Royalty is ERC721, Ownable {

    struct RoyaltyItem {
        uint id;
        string name;
        string description;
        uint256 price;
    }

    uint256 public nextTokenId;
    mapping(uint256 => RoyaltyItem) public royaltyItems;

    constructor() ERC721("Royalty", "RLT") {
        nextTokenId = 0;
    }

    function createRoyaltyItem(string memory _name, string memory _description, uint256 _price) public onlyOwner returns(uint256) {
        royaltyItems[nextTokenId] = RoyaltyItem(nextTokenId, _name, _description, _price);
        _mint(msg.sender, nextTokenId);
        nextTokenId++;
        return nextTokenId - 1;
    }

    function getRoyaltyItem(uint256 _tokenId) public view returns(uint id, string memory name, string memory description, uint256 price) {
        RoyaltyItem storage royaltyItem = royaltyItems[_tokenId];
        return (royaltyItem.id, royaltyItem.name, royaltyItem.description, royaltyItem.price);
    }
}
