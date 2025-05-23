// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ERC_20.sol";
import "./ERC_1155.sol";

contract MultiTokenFactory {
    address public owner;
    address public addressERC20;
    address public addressERC1155;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    function createERC20(address caAddress) public onlyOwner {
        StudyTokenKiros STRtoken = new StudyTokenKiros(caAddress);
        addressERC20 = address(STRtoken);
    }

    function createERC1155(string memory uri) public onlyOwner {
        ERC1155Study badge = new ERC1155Study(uri);
        addressERC1155 = address(badge);
    }

    function 
}
