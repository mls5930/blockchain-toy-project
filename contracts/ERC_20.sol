// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC_20 is ERC20 {
    address public owner;
    address public caAddress;

    constructor() ERC20("StudyTokenKiros", "STK") {
        owner = msg.sender;
        uint256 initialSupply = 1_000_000 * 10 ** decimals();
        _mint(owner, initialSupply);
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }

    function approveForCA(address _ca) public {
        //권한부여함수
        require(caAddress == address(0), "CA already set");
        caAddress = _ca;
        _approve(owner, _ca, totalSupply());
    }

    function minting(address to, uint256 value) public onlyOwner {
        //새로운 발급
        _mint(to, value);
    }

    function getowner() public view returns (address) {
        return owner;
    }
}
