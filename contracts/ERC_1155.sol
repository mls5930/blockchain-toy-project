// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract ERC_1155 is ERC1155 {
    address private owner;
    uint256 public namal = 0;
    uint256 public GOOD = 1;
    uint256 public BEST = 2;
    uint256 public EXCELLENT = 3;

    modifier onlyOwner() {
        require(msg.sender == owner, "onlyOwner");
        _;
    }
    // "ipfs://bafybeigpwepumxlnre32hyc6ys7esbgij55wxqtd5edfmsj7ux3nypmdfq/{id}.json"
    constructor(string memory _uri) ERC1155(_uri) {
        owner = msg.sender;
    }

    function mintClass(
        address to,
        uint256 id,
        uint256 amount,
        string memory message
    ) public payable {
        _mint(to, id, amount, bytes(message));
    }
    function setApprovalForPostWarld(address boardID) public {
        //권한부여함수
        _setApprovalForAll(owner, boardID, true);
    }

    function getClass(address useraddress) public view returns (uint256) {
        if (balanceOf(useraddress, 3) > 0) {
            return 3; // Diamond
        } else if (balanceOf(useraddress, 2) > 0) {
            return 2; // Gold
        } else if (balanceOf(useraddress, 1) > 0) {
            return 1; // Silver
        } else if (balanceOf(useraddress, 0) > 0) {
            return 0; // Normal
        }
        return 9999; // 아직 아무 배지도 없음
    }

    // 전체 NFT 토큰 갯수 확인 함수
    function getBadgeCounts(
        address user
    ) public view returns (uint256[4] memory) {
        return [
            balanceOf(user, 0), // Normal
            balanceOf(user, 1), // GOOD
            balanceOf(user, 2), // BEST
            balanceOf(user, 3) // EXCELLENT
        ];
    }

    // function getClass(address useraddress, uint256 id) public view returns (uint256) {
    //     return balanceOf(useraddress, id);
    // }

    // function mintBadgeIfQualified(address user, uint256 id) public onlyOwner {
    //     if (id == silver) {
    //         require(
    //             postCount[user] >= 3 && rewardTotal[user] >= 10,
    //             "Not qualified for silver"
    //         );
    //     } else if (id == gold) {
    //         require(
    //             postCount[user] >= 10 && rewardTotal[user] >= 30,
    //             "Not qualified for gold"
    //         );
    //     } else if (id == Diamond) {
    //         require(
    //             postCount[user] >= 20 && rewardTotal[user] >= 100,
    //             "Not qualified for diamond"
    //         );
    //     }
    //     _mint(user, id, 1, "");
    // }
}

// 메서드   설명   ERC-20/721과 비교
// safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes data)   특정 토큰 ID의 수량만큼 전송   ERC-721은 1개씩, ERC-1155는 여러 개 가능

// safeBatchTransferFrom(...)   여러 종류(ID)의 토큰을 한 번에 전송   ERC-721/20에는 없음

// balanceOfBatch(...)   여러 주소/ID에 대한 잔액을 한꺼번에 조회   ERC-721은 단일 조회만 가능

// setApprovalForAll()   모든 토큰에 대해 일괄 승인   ERC-20은 approve() 하나만, 1155는 통합

// uri(uint256 id)   각 토큰 ID별 메타데이터 URL   ERC-721은 tokenURI()
