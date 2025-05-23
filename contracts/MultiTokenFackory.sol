// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
contract postWarld {
    IERC20 public token_20;
    IERC1155 public token_1155;
    address public owner;
    mapping(address => uint256) public postCount;
    mapping(address => uint256) public rewardTotal;
    mapping(address => bool) private member;

    constructor(address token_20address, address token_1155address) {
        owner = msg.sender;
        token_20 = IERC20(token_20address);
        token_1155 = IERC1155(token_1155address);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    modifier member() {}

    function CAtransfer(
        address userAddress,
        uint256 value
    ) public payable onlyOwner {
        require(msg.value != 0.5 ether, "give 0.5eth");
        require(token_20.balanceOf(owner) >= value, "Not enough STK");
        require(
            token_20.allowance(owner, address(this)) >= msg.value,
            "Your balance is insufficient."
        );
        payable(owner).transfer(msg.value);
        token_20.transferFrom(owner, msg.sender, value);
        postCount[userAddress] += 1;
        if (postCount[userAddress] > 3) {}
    }

    function getpostCount(address userAddress) public view returns (uint256) {
        return postCount[userAddress];
    }
}
