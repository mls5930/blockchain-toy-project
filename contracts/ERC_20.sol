// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StudyTokenKiros is ERC20 {
    address public owner;
    address public caAddress;

    constructor(address _caAddress) ERC20("StudyTokenKiros", "STK") {
        owner = msg.sender;
        caAddress = _caAddress;

        uint256 initialSupply = 1_000_000 * 10 ** decimals();
        _mint(owner, initialSupply);

        // 권한 위임 (owner → CA)
        _approve(owner, caAddress, initialSupply);
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    // 새로운 발급.
    function minting(address to, uint256 value) public onlyOwner {
        _mint(to, value);
    }
}
